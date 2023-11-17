import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../utils/endpoints";
import { LoginStyle } from "../styling/stylingPage/LoginStyle";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [DataSiswa, setDataSiswa] = useState("");
  const [verif, setVerif] = useState(false);
  const [Message, SetMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    fetch(Endpoints.databasesiswa, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDataSiswa(data))
      .catch(() => {
        setVerif(true);
        SetMessage(
          "Mohon maap, koneksi sedang buruk.  Silahkan refresh kembali.  Terima kasih."
        );
      });
  }, []);

  const handleSubmit = () => {
    DataSiswa.map((value) => {
      if (
        value.nama_lengkap.toLowerCase() !== inputs.nama_lengkap.toLowerCase()
      ) {
        setVerif(true);
        SetMessage("Silahkan periksa kembali input nama lengkap anda.");
        return;
      } else if (value.password !== inputs.password) {
        setVerif(true);
        SetMessage("Silahkan periksa kembali input password anda.");
        return;
      } else {
        const selectLink = DataSiswa.find(function (value) {
          return (
            value.nama_lengkap.toLowerCase() ===
            inputs.nama_lengkap.toLowerCase()
          );
        });
        const select = {
          nama_lengkap: selectLink.nama_lengkap,
          link_database: selectLink.link_database,
        };
        navigate("/window", {
          state: select,
        });
      }
    });
  };

  return (
    <div
      className={LoginStyle.container}
      style={{ backgroundImage: "url('./backgroundpattern.png')" }}
    >
      {verif && (
        <div className={LoginStyle.containerVerif}>
          <p className={LoginStyle.Verif}>{Message}</p>
        </div>
      )}

      {DataSiswa ? (
        <div className={LoginStyle.containerDataSiswa}>
          <div className={LoginStyle.containerDataSiswaSize}>
            <div className={LoginStyle.containerForm}>
              <div className={LoginStyle.containerImage}>
                <img src="./educate.png" alt=" " />
              </div>
              <h1 className={LoginStyle.login}>Login</h1>
              <p className={LoginStyle.logindeskripsi}>
                Silahkan input data dengan benar.
              </p>
              <label className={LoginStyle.labelInput}>Username</label>
              <input
                className={LoginStyle.styleInput}
                type="text"
                name="nama_lengkap"
                value={inputs.nama_lengkap || ""}
                onChange={handleChange}
              />
              <label className={LoginStyle.labelInput}>Password</label>
              <input
                className={LoginStyle.styleInput}
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
              />

              <button
                className={LoginStyle.buttonSubmit}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={LoginStyle.containerLoading}>
          <div className={LoginStyle.Loading}></div>
        </div>
      )}
    </div>
  );
};
export default Login;
