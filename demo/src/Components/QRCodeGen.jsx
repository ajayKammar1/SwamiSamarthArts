import React, { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGen = ({ URL, setQRCodeURL }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      const qrCodeURL = canvasRef.current.toDataURL("image/png");
      setQRCodeURL(qrCodeURL);
    }
  }, [setQRCodeURL]);

  return (
    <div>
      <QRCodeCanvas
        ref={canvasRef}
        value={URL}
        bgColor="#ffffff"
        fgColor="#000000"
        level="Q"
      />
    </div>
  );
};

export default QRCodeGen;
