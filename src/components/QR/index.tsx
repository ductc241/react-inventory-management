import React from 'react'
import { QRCodeSVG } from 'qrcode.react';


type Props = {}

const QR = () => {
  return (
    <div>
      <QRCodeSVG
        value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
        size={100}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
          src: "https://static.zpao.com/favicon.png",
          x: undefined,
          y: undefined,
          height: 24,
          width: 24,
          excavate: true,
        }}
      />
    </div>
  )
}

export default QR