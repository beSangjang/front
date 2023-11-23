import React, { useState } from "react";

export default function GoogleForm() {
  return (
    <div className="flex-shrink-0 w-full">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdnNK-18zAdW1NQXKqA2fzezO4pc6gL0WlX1ElEhVvMHnyUAg/viewform?embedded=true"
        width="800"
        height="700"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      ></iframe>
    </div>
  );
}
