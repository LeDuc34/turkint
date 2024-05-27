"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("1cccd930-17a4-462c-be8c-8845f65807e4");
  }, []); // Add an empty dependency array to run only once

  return null;
}

export default CrispChat;
