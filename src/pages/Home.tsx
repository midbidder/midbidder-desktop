import React from "react";
import PlayButton from "../components/PlayButton";
import { BodyText, ExampleTextSwatch, TitleText } from "../components/Text";

export default function Home() {
  return (
    <div>
      <div>
        <PlayButton />
        <ExampleTextSwatch/>
      </div>
    </div>
  );
}
