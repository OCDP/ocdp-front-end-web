import React from "react";
import "./FadeLoading.less";

import { mdiLoading } from "@mdi/js";
import MaterialIcon from "icons/MaterialIcon";

interface Props {
  loading: boolean;
  message?: string;
  dark?: boolean;
}
export default function ({ loading, message, dark }: Props) {
  if (loading) {
    return (
      <section className={`fade-loading ${dark ? "dark" : ""}`}>
        <MaterialIcon path={mdiLoading} spin className="loading" />
        <div className="message">{message}</div>
      </section>
    );
  } else return <></>;
}
