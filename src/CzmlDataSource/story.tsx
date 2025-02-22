import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Viewer from "../Viewer";
import CzmlDataSource from "./CzmlDataSource";

const czml = [
  {
    id: "document",
    name: "CZML",
    version: "1.0",
  },
  {
    id: "shape1",
    name: "TOKYO",
    position: {
      cartographicDegrees: [139.77, 35.68, 20000.0],
    },
    ellipse: {
      semiMinorAxis: 50000.0,
      semiMajorAxis: 50000.0,
      height: 20000,
      material: {
        solidColor: {
          color: {
            rgba: [0, 255, 0, 100],
          },
        },
      },
      outline: true,
      outlineColor: {
        rgba: [255, 0, 0, 0],
      },
    },
  },
];

const onLoadAction = action("onLoad");

const onLoad = (g: Cesium.GeoJsonDataSource) => {
  // You can process the data source here
  g.entities.values[0].name = "TOKYO!";
  onLoadAction(g);
};

storiesOf("CzmlDataSource", module)
  .add("Basic", () => (
    <Viewer full>
      <CzmlDataSource data={czml} onLoad={onLoad} onError={action("onError")} />
    </Viewer>
  ))
  .add("Show", () => {
    const [show, setShow] = useState(true);
    return (
      <Viewer full>
        <button
          style={{ position: "absolute", top: "0", left: "0" }}
          onClick={() => setShow(s => !s)}>
          Toggle
        </button>
        <CzmlDataSource data={czml} show={show} />
      </Viewer>
    );
  });
