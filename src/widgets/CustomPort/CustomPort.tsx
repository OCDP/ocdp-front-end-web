import React, { memo, useCallback, useMemo, useRef } from "react";
import "./CustomPort.less";

import { DiagramEngine } from "@projectstorm/react-diagrams";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import useUnmountEffect from "hooks/lifecycle/useUnmountEffect";
import CustomPortModel from "./CustomPort.model";
import { Toolkit } from "@projectstorm/react-canvas-core";
import { keys } from "lodash";
import { Observable } from "rxjs";

interface Props {
  port: CustomPortModel;
  engine: DiagramEngine;
  reportObservable?: Observable<void>;
  className?: string;
  style?: React.CSSProperties;
}
const CustomPort: React.FC<Props> = ({
  port,
  engine,
  reportObservable,
  style = {},
  className,
}) => {
  const ref = useRef<any>();

  const report = useCallback(() => {
    if (ref.current) {
      port.updateCoords(engine.getPortCoords(port, ref.current));
    }
  }, [engine, port]);

  const engineListenerHandle = useMemo(() => {
    return engine.registerListener({
      canvasReady: report,
    });
  }, [engine, report]);

  useMountEffect(() => {
    if (engine.getCanvas()) {
      report();
      if (reportObservable) {
        reportObservable.subscribe(report);
      }
    }
  });

  useUnmountEffect(() => {
    engineListenerHandle?.deregister();
    Object.values(port.getLinks()).forEach((link) => link.clearListeners());
    port.clearListeners();
  });

  const extraProps = useMemo(() => {
    if (Toolkit.TESTING) {
      const links = keys(
        port.getNode().getPort(port.getName())?.links || {}
      ).join(",");
      return {
        "data-links": links,
      };
    }
    return {};
  }, [port]);

  return (
    <div
      style={style}
      ref={ref}
      className={`port custom-port ${className || ""}`}
      data-name={port.getName()}
      data-nodeid={port.getNode().getID()}
      title={port.getName()}
      {...extraProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        clipRule="evenodd"
        viewBox="0 0 495 495"
      >
        {port.getName() === "in" ? (
          <>
            <path
              fillRule="nonzero"
              d="M405.284 201.188L130.804 13.28C118.128 4.596 105.356 0 94.74 0 74.216 0 61.52 16.472 61.52 44.044v406.124c0 27.54 12.68 43.98 33.156 43.98 10.632 0 23.2-4.6 35.904-13.308l274.608-187.904c17.66-12.104 27.44-28.392 27.44-45.884.004-17.48-9.664-33.764-27.344-45.864z"
              transform="translate(-61.52)"
            />
          </>
        ) : (
          <g transform="translate(-255.072 -251.421) scale(1.639)">
            <circle cx="306.634" cy="304.406" r="151.007" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default memo(CustomPort);
