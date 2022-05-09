import React, { useState } from "react";
import axios from "axios";

export default function SMS() {
  const [phoneno, setPhoneno] = useState("+919756382029");
  const [showVerify, setShowVerify] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");

  const sendCode = async () => {
    const resp = await axios.post("/send/code", {
      to: phoneno,
      locale: "en",
      channel: "sms",
    });
    console.log(resp.data);
    setShowVerify(true);
  };

  const verifyCode = async () => {
    const resp = await axios.post("/send/verify", {
      to: phoneno,
      code: verificationCode,
    });
    console.log(resp.data);
    setShowVerify(true);
  };

  return (
    <div>
      <div class="container">
        <h2>Twilio Verify</h2>
        <p>
          This example shows how to deploy
          <a href="https://twilio.com/docs/verify/api">Twilio Verify</a>
          and Twilio functions for serverless user verification.
        </p>
        <div class="content">
          <form id="login">
            <div class="form-group phone-input">
              <p>Enter your phone number:</p>
              <input
                type="tel"
                id="phone_number"
                class="form-control"
                onChange={(e) => setPhoneno(e.target.value)}
              />
            </div>
            <div class="form-group locale-input">
              <p>Select your preferred language:</p>
              <select class="form-control" id="select-locale"></select>
            </div>
            <div class="form-group">
              <input
                class="btn btn-primary"
                value="Verify"
                onClick={sendCode}
              />
            </div>
          </form>
          <span id="form-error" class="text-danger"></span>
        </div>

        {showVerify && (
          <div class="modal-content">
            <div class="modal-body">
              <div class="row">
                <div class="col-lg-12">
                  <div class="result-message"></div>
                  <div>
                    <input
                      type="text"
                      class="form-control input-lg"
                      id="verification_code"
                      placeholder="Enter the token sent to your device"
                      required
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <span class="input-group-btn">
                      <button
                        class="btn btn-primary btn-lg"
                        onClick={verifyCode}
                      >
                        Verify
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
