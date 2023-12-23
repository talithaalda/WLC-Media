import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const CustomAlert = ({ message, variant, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onClose(); // Optional: You can call onClose after the timeout if you want to perform additional actions.
    }, 3000);

    return () => clearTimeout(timeout); // Clear the timeout if the component is unmounted.
  }, [onClose]); // Include onClose in the dependency array if it may change.

  const handleAlertClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Alert show={show} variant={variant} onClose={handleAlertClose} dismissible>
      {message}
    </Alert>
  );
};

export default CustomAlert;
