import React, { useState } from "react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";

const unitLength = "3em";

interface BidChildrenProps {
  bidValue: number;
  setBidValue: (newBidValue: number) => void;
}

interface BidButtonProps {
  sign: "+" | "-";
}

function BidSlider(props: BidChildrenProps) {
  return (
    <div>
      <div>
        <Form.Control type="range" value={props.bidValue} onChange={event => {
            const newBidValue = parseInt(event.target.value);
            props.setBidValue(newBidValue)
        }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <span style={{ width: unitLength }}>0</span>
        <span style={{ width: unitLength }}>100</span>
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
          <h5><u>bid volume</u></h5>
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
