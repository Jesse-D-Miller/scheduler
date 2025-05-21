import "./styles.scss";

import Header from "./Header";

import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => console.log("CONFIRM")}
          onEdit={() => console.log("EDIT")}
        />
        :
        <Empty onAdd={() => console.log("CREATE")} />}
    </article>
  );
}
