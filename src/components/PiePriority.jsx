import { PiePriorityStyle } from "../styling/stylingComponent/piePriority";
import PriorityFunction from "./Performance";

const Priority = ({ input }) => {
  const inputData1 = {
    done: input.pu,
    pending: input.negpu,
    name: "Penalaran Umum",
  };
  const inputData2 = {
    done: input.pemu,
    pending: input.negpemu,
    name: "Pemahaman Umum",
  };
  const inputData3 = {
    done: input.men,
    pending: input.negmen,
    name: "Bacaan dan Menulis",
  };
  const inputData4 = {
    done: input.pk,
    pending: input.negpk,
    name: "Pengetahuan Kuantitatif",
  };
  const inputData5 = {
    done: input.bind,
    pending: input.negbind,
    name: "Bahasa Indonesia",
  };
  const inputData6 = {
    done: input.bing,
    pending: input.negbing,
    name: "Bahasa Inggris",
  };
  const inputData7 = {
    done: input.m,
    pending: input.negm,
    name: "Penalaran Matematika",
  };

  const Data = [
    {
      id: 1,
      input: inputData1,
    },
    {
      id: 2,
      input: inputData2,
    },
    {
      id: 3,
      input: inputData3,
    },
    {
      id: 4,
      input: inputData4,
    },
    {
      id: 5,
      input: inputData5,
    },
    {
      id: 6,
      input: inputData6,
    },
    {
      id: 7,
      input: inputData7,
    },
  ];

  return (
    <div
      className={PiePriorityStyle.container}
      style={{ fontFamily: " 'Geologica', sans-serif" }}
    >
      <h1 className={PiePriorityStyle.studentReport}>Student Report</h1>
      <p className={PiePriorityStyle.detailStudentReport}>
        Berikut adalah data performance dari semua mata pelajaran.
      </p>

      {input ? (
        <div className={PiePriorityStyle.containerPiePriority}>
          {Data.map((value) => (
            <div
              key={value.id}
              className={PiePriorityStyle.containerPiePriorityIn}
            >
              <PriorityFunction input={value.input} />
            </div>
          ))}
        </div>
      ) : (
        <div className={PiePriorityStyle.containerLoading}>
          <div className={PiePriorityStyle.loading}></div>
          <div className={PiePriorityStyle.loading}></div>
          <div className={PiePriorityStyle.loading}></div>
          <div className={PiePriorityStyle.loading}></div>
          <div className={PiePriorityStyle.loading}></div>
          <div className={PiePriorityStyle.loading}></div>
          <div className={PiePriorityStyle.loading}></div>
        </div>
      )}
    </div>
  );
};

export default Priority;
