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
        // imageSettings={{
        //   src: "https://res.cloudinary.com/dywsyrah3/image/upload/v1669193368/poly_wareh_j06pfe_y53k83.png",
        //   x: undefined,
        //   y: undefined,
        //   height: 24,
        //   width: 24,
        //   excavate: true,
        // }}
      />
    </div>
  )
}

export default QR