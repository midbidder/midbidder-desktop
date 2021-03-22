import React, { useState } from "react";
import {
  OverlayTrigger,
  Popover,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { blue, bodyFont, bodyFontWeight } from "../styles/GlobalStyles";
import { BodyText, TitleText } from "./Text";
import { BidSlider } from "./BidSlider";
import { Button, TextField } from "@material-ui/core/";

const unitLength = "3em";

interface BidChildrenProps {
  bidValue: number;
  setBidValue: (newBidValue: number) => void;
}

interface BidButtonProps {
  sign: "+" | "-";
}

const sliderMaxSettings = [10, 100, 1000, 10000];

function BidQuantitySlider(props: BidChildrenProps) {
  const [sliderMax, setSliderMax] = useState(1);
  const [showMaxOverlay, setShowMaxOverlay] = useState(false);
  return (
    <div>
      <div>
        <BidSlider
          defaultValue={0}
          value={
            isNaN(props.bidValue)
              ? 0
              : (100 * props.bidValue) / sliderMaxSettings[sliderMax]
          }
          onChange={(
            event: React.ChangeEvent<{}>,
            sliderValue: number | number[]
          ) => {
            const percent = sliderValue as number;
            const newBidValue = (sliderMaxSettings[sliderMax] * percent) / 100;
            props.setBidValue(newBidValue);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <BodyText size="s" underline>
          0
        </BodyText>

        <span
          style={{ width: unitLength }}
          onMouseOver={() => {
            setShowMaxOverlay(true);
          }}
          onMouseOut={() => setShowMaxOverlay(false)}
        >
          <OverlayTrigger
            trigger="click"
            show={showMaxOverlay}
            overlay={
              <Popover
                id="popover-basic"
                onMouseOut={() => setShowMaxOverlay(false)}
              >
                <Popover.Title>
                  <BodyText size="s">set max</BodyText>
                </Popover.Title>
                <Popover.Content>
                  <DropdownButton
                    as={ButtonGroup}
                    title={sliderMaxSettings[sliderMax]}
                    style={{ fontFamily: bodyFont }}
                    id="bg-vertical-dropdown-1"
                  >
                    {sliderMaxSettings.map((value: number, index: number) => (
                      <Dropdown.Item
                        onMouseDown={() => {
                          setSliderMax(index);
                          setShowMaxOverlay(false);
                          if (props.bidValue > sliderMaxSettings[index])
                            props.setBidValue(sliderMaxSettings[index]);
                        }}
                      >
                        <BodyText size="s">{value.toString()}</BodyText>
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Popover.Content>
              </Popover>
            }
          >
            <BodyText size="s" underline>
              {sliderMaxSettings[sliderMax].toString()}
            </BodyText>
          </OverlayTrigger>
        </span>
      </div>
    </div>
  );
}

function BidTextInput(props: BidChildrenProps) {
  return (
    <TextField
      placeholder="Bid Amount"
      aria-label="Bid Amount"
      type={"number"}
      style={{
        width: "9em",
        borderRadius: 0,
        textAlign: "center",
        fontFamily: bodyFont,
      }}
      InputProps={{
        style: {
          height: "4em",
          fontFamily: bodyFont,
          fontWeight: bodyFontWeight,
          fontSize: "1.2em"
        },
      }}
      inputProps={{ min: 0, style: { textAlign: "center" } }}
      value={props.bidValue}
      onChange={(event: React.ChangeEvent<any>) => {
        const formValue: number = parseInt(event.target.value);
        props.setBidValue(formValue);
      }}
    />
  );
}

const leftButtonStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  borderTopLeftRadius: "30%",
  borderBottomLeftRadius: "30%",
};

const rightButtonStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderTopRightRadius: "30%",
  borderBottomRightRadius: "30%",
};

function BidButton(props: BidChildrenProps & BidButtonProps) {
  return (
    <Button
      style={{
        backgroundColor: blue,
        color: "white",
        width: unitLength,
        ...(props.sign === "+" ? rightButtonStyle : leftButtonStyle),
      }}
      onClick={() => {
        props.setBidValue(props.bidValue + (props.sign === "+" ? 1 : -1));
      }}
    >
      <BodyText>{props.sign}</BodyText>
    </Button>
  );
}

export default function BidQuantityForm() {
  const [bidValue, setBidValue] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TitleText size="s" underline>
        select bid quantity
      </TitleText>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <BidButton sign="-" bidValue={bidValue} setBidValue={setBidValue} />
        <BidTextInput bidValue={bidValue} setBidValue={setBidValue} />
        <BidButton sign="+" bidValue={bidValue} setBidValue={setBidValue} />
      </div>
      <div style={{ width: "15em" }}>
        <BidQuantitySlider bidValue={bidValue} setBidValue={setBidValue} />
      </div>
    </div>
  );
}
