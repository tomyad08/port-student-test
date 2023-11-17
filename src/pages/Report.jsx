import { useLocation, useNavigate } from "react-router-dom";
import Priority from "../components/PiePriority";
import Progress from "../components/Progress";
import { useEffect, useState } from "react";
import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { ReportStyle } from "../styling/stylingPage/ReportStyle";

const Report = () => {
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Raport-Karantina-UI.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const [loading, setLoading] = useState(true);
  const [curve, setCurve] = useState("");
  const [prior, setPrior] = useState("");
  const [verif, setVerif] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getPriority = (data) => {
    let pu = 0;
    let m = 0;
    let bind = 0;
    let bing = 0;
    let men = 0;
    let pk = 0;
    let pemu = 0;

    data.map((value) => {
      pu += Number(value.presentase_pu);
      m += Number(value.presentase_m);
      bind += Number(value.presentase_bind);
      bing += Number(value.presentase_bing);
      men += Number(value.presentase_men);
      pk += Number(value.presentase_pk);
      pemu += Number(value.presentase_pemu);
    });
    const x = data.length * 10000;
    // ada bug, nilai yang seharusnya 110250, berubah menjadi 1102,5. Sehingga saya kalikan 100 untuk senilai dengan nilai sebenarnya
    setPrior({
      pu: (pu * 10000) / x,
      negpu: 100 - (pu * 10000) / x,
      m: (m * 10000) / x,
      negm: 100 - (m * 10000) / x,
      bind: (bind * 10000) / x,
      negbind: 100 - (bind * 10000) / x,
      bing: (bing * 10000) / x,
      negbing: 100 - (bing * 10000) / x,
      men: (men * 10000) / x,
      negmen: 100 - (men * 10000) / x,
      pk: (pk * 10000) / x,
      negpk: 100 - (pk * 10000) / x,
      pemu: (pemu * 10000) / x,
      negpemu: 100 - (pemu * 10000) / x,
    });
  };

  const getProgress = (data) => {
    let Progs = [];
    data.map((value) => {
      Progs.push({
        timestamp: value.timestamp,
        nilai_rata_rata: value.nilai_rata_rata,
      });
    });
    setCurve(Progs);
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      fetch(location.state.link_database, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          getProgress(data);
          getPriority(data);
        })
        .then(() => setLoading(false))
        .catch(() => setVerif(true));
    }
  }, []);

  const handleHome = () => {
    const data = {
      link_database: location.state.link_database,
      nama_lengkap: location.state.nama_lengkap,
    };
    navigate("/window", {
      state: data,
    });
  };
  return (
    <div className={ReportStyle.container}>
      <div className={ReportStyle.containerWidth}>
        <div className={ReportStyle.downloads}>
          <button onClick={onButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </button>
        </div>
        {!loading ? (
          <div ref={ref} className={ReportStyle.containerCore}>
            <Priority input={prior} />
            <Progress input={curve} />
          </div>
        ) : (
          <div className={ReportStyle.containerLoading}>
            <div className={ReportStyle.loading}>
              {verif && (
                <h1 className={ReportStyle.verif}>
                  Mohon maap, koneksi sedang buruk. Silahkan untuk refresh
                  kembali koneksi anda. Terima Kasih.
                </h1>
              )}
            </div>
          </div>
        )}
        <div className={ReportStyle.containerButton}>
          <button className={ReportStyle.button} onClick={handleHome}>
            <div className={ReportStyle.home}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-house-door-fill mx-1"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
              </svg>
            </div>
            <p className={ReportStyle.textHome}>Home</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Report;
