import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { useLocation, useNavigate } from "react-router-dom";
import ComponentSoal from "../components/Soal";
import { TestStyle } from "../styling/stylingPage/TestStyle";

const { useEffect, useState } = require("react");

const TestPage = () => {
  const [Data, setData] = useState("");
  const [count, setCount] = useState(1);
  const [countDown, setCountdown] = useState(10800); //10800
  const [no, setNo] = useState([]);
  const [notif, setNotif] = useState("");
  const [cond, setCond] = useState(false);
  const [Loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const getData = async (data) => {
    let setNumber = [];
    await data.map((value) => {
      setNumber.push({
        kode_soal: value.kode_soal,
        no_soal: value.no_soal,
        select: "",
      });
    });
    setNo(setNumber);
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      fetch(location.state.tryoutLink, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          getData(data);
        })
        .catch(() => {
          setNotif(
            "Mohon maap gagal mengunduh data. Silahkan refresh atau reload."
          );
          setCond(true);
        });
    }
  }, []);

  const handleBack = () => {
    setCount(count - 1);
    if (count < 0) {
      setCount(1);
    }
  };

  const handleNext = () => {
    setCount(count + 1);
    if (count > Data.length - 1) {
      setCount(1);
    }
  };

  const Change = (select) => {
    let setChange = [];
    no.map((value) => {
      if (value.no_soal === Data[count - 1].no_soal) {
        setChange.push({
          kode_soal: value.kode_soal,
          no_soal: value.no_soal,
          select: select,
        });
      } else {
        setChange.push({
          kode_soal: value.kode_soal,
          no_soal: value.no_soal,
          select: value.select,
        });
      }
    });
    setNo(setChange);
  };

  const handleSelect = (select) => {
    Change(select);
    setCount(count + 1);
    if (count > Data.length - 1) {
      setCount(1);
    }
  };

  const HandlePoint = () => {
    let PK = 0;
    let PM = 0;
    let IND = 0;
    let ING = 0;
    let PU = 0;
    let BM = 0;
    let PPU = 0;

    for (let i = 0; i < Data.length; i++) {
      if (Data[i].jawaban === no[i].select) {
        if (Data[i].kode_soal === "PK") {
          PK += 1000;
          continue;
        } else if (Data[i].kode_soal === "PM") {
          PM += 1000;
          continue;
        } else if (Data[i].kode_soal === "IND") {
          IND += 1000;
          continue;
        } else if (Data[i].kode_soal === "ING") {
          ING += 1000;
          continue;
        } else if (Data[i].kode_soal === "PU") {
          PU += 1000;
          continue;
        } else if (Data[i].kode_soal === "BM") {
          BM += 1000;
          continue;
        } else if (Data[i].kode_soal === "PPU") {
          PPU += 1000;
          continue;
        }
      }
    }
    const average = (PK + PU + PM + PPU + BM + ING + IND) / 7;
    const endSubmit = {
      nama_lengkap: location.state.nama_lengkap,
      penalaran_umum: PU,
      penalaran_matematika: PM,
      bahasa_indonesia: IND,
      bahasa_inggris: ING,
      bacaan_menulis: BM,
      pengetahuan_kuantitatif: PK,
      pemahaman_umum: PPU,
      nilai_rata_rata: average,
      presentase_pu: PU / 100,
      presentase_m: PM / 200,
      presentase_bind: IND / 300,
      presentase_bing: ING / 200,
      presentase_men: BM / 200,
      presentase_pk: PK / 150,
      presentase_pemu: PPU / 200,
    };

    var formData = new FormData();
    for (var key in endSubmit) {
      if (endSubmit.hasOwnProperty(key)) {
        formData.append(key, endSubmit[key]);
      }
    }

    const data = {
      nilai: Math.floor(average),
      link_database: location.state.link_database,
      nama_lengkap: location.state.nama_lengkap,
    };

    fetch(location.state.link_database, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        navigate("/hasiltest", {
          state: data,
        });
      })
      .catch(() => {
        setCond(true);
        setNotif(
          "Mohon maap data gagal tersimpan di database pribadi, silahkan hubungi staff Karantina UI."
        );
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  setTimeout(() => {
    setData("");
    setCond(true);
    setNotif("Mohon maaf waktu sudah habis");
    HandlePoint();
  }, 10800000);

  const handleSoal = (no_soal) => {
    setCount(no_soal);
  };

  let hour = Math.floor(countDown / 3600);
  let minute = Math.floor((countDown % 3600) / 60);
  let second = countDown % 60;

  const handleSubmit = () => {
    setLoading(true);
    HandlePoint();
  };

  return (
    <div className={TestStyle.container}>
      <div className={TestStyle.containersoal1}>
        <div className={TestStyle.containersoal2}>
          {cond && (
            <p className="p-2 bg-red-600 m-2 rounded-lg text-center text-sm text-white animate-pulse">
              {notif}
            </p>
          )}
          {Data ? (
            <div>
              <div className={TestStyle.textnosoal}>Soal {count}</div>
              <div>
                <Latex>{Data[count - 1].soal_text}</Latex>
              </div>
              <div>
                {Data[count - 1].soal_gambar ? (
                  <div>
                    <img
                      src={Data[count - 1].soal_gambar}
                      className={TestStyle.sizepict}
                    />{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {Data[count - 1].pilihan_a_gambar ? (
                <div className={TestStyle.containerOptionPicture}>
                  <div>
                    A.{" "}
                    <img
                      src={Data[count - 1].pilihan_a_gambar}
                      alt=""
                      className={TestStyle.sizepict}
                      onClick={() => handleSelect("A")}
                    />
                  </div>
                  <div>
                    B.{" "}
                    <img
                      src={Data[count - 1].pilihan_b_gambar}
                      alt=""
                      className={TestStyle.sizepict}
                      onClick={() => handleSelect("B")}
                    />
                  </div>
                  <div>
                    C.{" "}
                    <img
                      src={Data[count - 1].pilihan_c_gambar}
                      alt=""
                      className={TestStyle.sizepict}
                      onClick={() => handleSelect("C")}
                    />
                  </div>
                  <div>
                    D.{" "}
                    <img
                      src={Data[count - 1].pilihan_d_gambar}
                      alt=""
                      className={TestStyle.sizepict}
                      onClick={() => handleSelect("D")}
                    />
                  </div>
                  <div>
                    E.{" "}
                    <img
                      src={Data[count - 1].pilihan_e_gambar}
                      alt=""
                      className={TestStyle.sizepict}
                      onClick={() => handleSelect("E")}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className={TestStyle.optiontext}
                    onClick={() => handleSelect("A")}
                  >
                    A. <Latex>{Data[count - 1].pilihan_a_text}</Latex>
                  </div>
                  <div
                    className={TestStyle.optiontext}
                    onClick={() => handleSelect("B")}
                  >
                    B. <Latex>{Data[count - 1].pilihan_b_text}</Latex>
                  </div>
                  <div
                    className={TestStyle.optiontext}
                    onClick={() => handleSelect("C")}
                  >
                    C. <Latex>{Data[count - 1].pilihan_c_text}</Latex>
                  </div>
                  <div
                    className={TestStyle.optiontext}
                    onClick={() => handleSelect("D")}
                  >
                    D. <Latex>{Data[count - 1].pilihan_d_text}</Latex>
                  </div>
                  <div
                    className={TestStyle.optiontext}
                    onClick={() => handleSelect("E")}
                  >
                    E. <Latex>{Data[count - 1].pilihan_e_text}</Latex>
                  </div>
                </div>
              )}
              <div className={TestStyle.containerSign}>
                <div className={TestStyle.backstyle} onClick={handleBack}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-caret-left-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                  </svg>
                </div>
                <div className={TestStyle.nextstyle} onClick={handleNext}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-caret-right-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className={TestStyle.containerLoading}>
              <div className={TestStyle.loading}></div>
            </div>
          )}
        </div>
      </div>
      <div className={TestStyle.containerinfo}>
        <div className={TestStyle.widtContainerInfo}>
          <div className={TestStyle.containerTime}>
            <div className={TestStyle.timeIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-alarm"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
              </svg>
            </div>
            <div>
              <h1 className={TestStyle.timeTitle}>Time</h1>
            </div>
          </div>
          <div className={TestStyle.containerTimeNumber}>
            <h1 className={TestStyle.time}>
              {hour}:{minute}:{second}
            </h1>
          </div>
          <div className={TestStyle.containerIconSoal}>
            <div className={TestStyle.containerNoSoal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-card-list"
                viewBox="0 0 16 16"
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
              </svg>
            </div>
            <h1 className={TestStyle.headNoSoal}>List Soal</h1>
          </div>

          <div className={TestStyle.noSoal}>
            {no.map((value) => (
              <div
                className={TestStyle.noSoalIn}
                key={value.no_soal}
                onClick={() => {
                  handleSoal(value.no_soal);
                }}
              >
                <ComponentSoal input={value} />
              </div>
            ))}
          </div>
          <button
            className={`${TestStyle.buttonSubmit} ${
              Loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
          >
            {Loading ? "Loading .." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default TestPage;
