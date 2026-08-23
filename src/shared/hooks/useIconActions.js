import { useState } from "react";

export const useIconActions = () => {
  const [states, setStates] = useState({});

  const setState = (name, value) => {
    setStates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggle = (name) => {
    setStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const runAction = async (name, action, successDuration = 800) => {
    if (states[name] === "loading") return;

    setState(name, "loading");

    try {
      await action();

      setState(name, "success");

      await new Promise((resolve) =>
        setTimeout(resolve, successDuration),
      );

      setState(name, "idle");
    } catch (error) {
      console.error(error);

      setState(name, "idle");
    }
  };

  const getStatus = (name) => states[name] ?? "idle";

  const getToggle = (name) => states[name] ?? false;

  return {
    states,
    runAction,
    toggle,
    getStatus,
    getToggle,
  };
};