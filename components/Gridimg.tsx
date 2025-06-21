import React, { useEffect, useState } from "react";
import { BuyForm } from "../typings";

interface Props {
  form: BuyForm;
}

export default function Gridimg({ form }: Props) {
  let xwidth = (form.xlastcoord! - form.xfirstcoord) * 10 + 10;
  if (form.xlastcoord! - form.xfirstcoord < 0) {
    xwidth = 10;
  }

  let yheight = (form.ylastcoord! - form.yfirstcoord) * 10 + 10;
  if (form.ylastcoord! - form.yfirstcoord < 0) {
    yheight = 10;
  }

  const [value, setValue] = useState("0x0");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_getTransactionByHash", params: [form.hash] })
        .then((receipt: any) => {
          setValue(receipt?.value);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      setValue("-1");
    }
  }, []);

  return (
    <>
      {value !== "0x0" && (
        <a href={form.websiteURL}>
          <img
            className={`absolute cursor-pointer`}
            style={
              form.xfirstcoord === -1
                ? {
                    left: form.xlastcoord! * 10 - 10,
                    top: form.ylastcoord! * 10 - 10,
                    width: 10,
                    height: 10,
                  }
                : {
                    left: form.xfirstcoord * 10 - 10,
                    top: form.yfirstcoord * 10 - 10,
                    width: xwidth,
                    height: yheight,
                  }
            }
            src={form.imageURL}
            title={form.name}
            alt={form.name}
            referrerPolicy="no-referrer"
          />
        </a>
      )}
    </>
  );
}
