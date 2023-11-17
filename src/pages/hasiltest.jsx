import { useLocation, useNavigate } from "react-router-dom";
import { HasilTestStyle } from "../styling/stylingPage/Hasiltest";
import { useEffect } from "react";

const HasilTest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);

  const handleClick = () => {
    const data = {
      link_database: location.state.link_database,
      nama_lengkap: location.state.nama_lengkap,
    };
    navigate("/report", {
      state: data,
    });
  };
  return (
    <div className={HasilTestStyle.container}>
      <div className={HasilTestStyle.containerSize}>
        <h1 className={HasilTestStyle.skorKamu}>Skor Kamu:</h1>
        <h1 className={HasilTestStyle.nilai}>{location.state.nilai}</h1>
        <h1 className={HasilTestStyle.kata}>
          Masih harus digenjot lagi nih cuy belajarnya! 🥳
        </h1>
        <div className={HasilTestStyle.containerButton}>
          <button className={HasilTestStyle.button} onClick={handleClick}>
            Lihat Progress
          </button>
        </div>
      </div>
    </div>
  );
};
export default HasilTest;
