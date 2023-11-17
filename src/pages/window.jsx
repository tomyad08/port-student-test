import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Endpoints } from "../utils/endpoints";
import { WindowStyle } from "../styling/stylingPage/WindowStyle";

const Window = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const [prev, setPrev] = useState(false);
  const [message, setMessage] = useState("");
  const [DataLink, setDataLink] = useState("");

  useEffect(() => {
    fetch(Endpoints.tryout, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDataLink(data))
      .catch(() => {
        setPrev(true);
        setMessage(
          "Mohon maap, koneksi anda sedang buruk.  Silahkan untuk refresh kembali koneksi anda."
        );
      });
    if (!location.state) {
      navigate("/");
    }
  }, []);

  const handleMulai = () => {
    DataLink.map((value) => {
      if (value.kode_tryout === input) {
        const data = {
          tryoutLink: value.link,
          link_database: location.state.link_database,
          nama_lengkap: location.state.nama_lengkap,
        };
        navigate("/test", {
          state: data,
        });
      }
    });
    setTimeout(() => {
      setPrev(true);
      setMessage("Silahkan cek kembali kode tryout yang anda masukkan.");
    }, 2000);
  };

  return (
    <div>
      <div className={WindowStyle.container}>
        {DataLink ? (
          <div className={WindowStyle.containerPrev}>
            {prev && <p className={WindowStyle.Prev}>{message}</p>}
            <div className={WindowStyle.containerHead}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="red"
                className="bi bi-exclamation-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>{" "}
              <p className={WindowStyle.head}>Informasi Penting</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="red"
                className="bi bi-exclamation-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
            <p className={WindowStyle.text}>
              Ujian online ini menguji peserta dengan 100 soal dalam jangka
              waktu 180 menit. Ujian dirancang untuk mengukur pemahaman mendalam
              dan kemampuan peserta dalam berbagai aspek. Dengan platform
              online, ujian ini memberi peserta fleksibilitas untuk mengikuti
              evaluasi ini dari mana saja. Melalui berbagai tipe pertanyaan,
              ujian ini memberikan gambaran yang akurat tentang pengetahuan dan
              keterampilan peserta dalam batas waktu yang ketat.
            </p>
            <div className={WindowStyle.containerInput}>
              <input
                className={WindowStyle.input}
                placeholder="Masukkan Kode TryOut"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className={WindowStyle.containerInput}>
              <button className={WindowStyle.button} onClick={handleMulai}>
                Mulai
              </button>
            </div>
            <p
              className={WindowStyle.textProgress}
              onClick={() => navigate("/report", { state: location.state })}
            >
              Lihat Progress Tryout Sebelumnya
            </p>
          </div>
        ) : (
          <div className={WindowStyle.containerLoading}>
            <div className={WindowStyle.loading}></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Window;
