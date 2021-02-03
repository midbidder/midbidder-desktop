import React, { useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  OverlayTrigger,
  Popover,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";

const unitLength = "3em";

interface BidChildrenProps {
  bidValue: number;
  setBidValue: (newBidValue: number) => void;
}

interface BidButtonProps {
  sign: "+" | "-";
}

const sliderMaxSettings = [10, 100, 1000, 10000];

function BidSlider(props: BidChildrenProps) {
  const [sliderMax, setSliderMax] = useState(1);
  const [showMaxOverlay, setShowMaxOverlay] = useState(false);
  return (
    <div>
      <div>
        <Form.Control
          type="range"
          value={
            isNaN(props.bidValue)
              ? 0
              : (100 * props.bidValue) / sliderMaxSettings[sliderMax]
          }
          onChange={(event) => {
            const percent = parseInt(event.target.value);
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
        <span style={{ width: unitLength }}>0</span>
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
                <Popover.Title as="h5">set max</Popover.Title>
                <Popover.Content>
                  <DropdownButton
                    as={ButtonGroup}
                    title={sliderMaxSettings[sliderMax]}
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
                        {value}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Popover.Content>
              </Popover>
            }
          >
            <u>{sliderMaxSettings[sliderMax]}</u>
          </OverlayTrigger>
        </span>
      </div>
    </div>
  );
}

function BidTextInput(props: BidChildrenProps) {
  return (
    <span
      style={{
        height: unitLength,
      }}
    >
      <InputGroup>
        <FormControl
          placeholder="Bid Amount"
          aria-label="Bid Amount"
          size="lg"
          type={"number"}
          style={{
            width: "9em",
            borderRadius: 0,
            textAlign: "center",
          }}
          value={props.bidValue}
          onChange={(event: React.ChangeEvent<any>) => {
            const formValue: number = parseInt(event.target.value);
            props.setBidValue(formValue);
          }}
        />
      </InputGroup>
    </span>
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
        width: unitLength,
        height: unitLength,
        ...(props.sign === "+" ? rightButtonStyle : leftButtonStyle),
      }}
      onClick={() => {
        props.setBidValue(props.bidValue + (props.sign === "+" ? 1 : -1));
      }}
    >
      {props.sign}
    </Button>
  );
}

export default function BidForm() {
  const [bidValue, setBidValue] = useState(0);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5>
          <u>select bid quantity</u>
        </h5>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BidButton sign="-" bidValue={bidValue} setBidValue={setBidValue} />
          <BidTextInput bidValue={bidValue} setBidValue={setBidValue} />
          <BidButton sign="+" bidValue={bidValue} setBidValue={setBidValue} />
        </div>
        <div style={{ width: "15em" }}>
          <BidSlider bidValue={bidValue} setBidValue={setBidValue} />
        </div>
      </div>
    </div>
  );
}
