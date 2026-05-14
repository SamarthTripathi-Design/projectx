import toast from "react-hot-toast";
import styles from "./CustomToast.module.css"; // Import the CSS module

export const CustomToast = (
  message: string,
  type: "success" | "error" | "loading",
  btnLabel?: string,
  duration?: number,
  toastId?: string,
  onClick?: () => void,
) => {
  const id = toastId || `toast-${Math.random().toString(36).substring(2, 9)}`;

  const handleClick = () => {
    toast.dismiss(id);
    if (onClick) {
      onClick();
    }
  };

  // Map the type to the specific CSS class
  const buttonClass = `${styles.button} ${styles[`${type}Btn`]}`;

  toast[type](
    <div className={styles.container}>
      <span>{message}</span>
      {btnLabel && (
        <button className={buttonClass} onClick={handleClick}>
          {btnLabel}
        </button>
      )}
    </div>,
    {
      id: id,
      duration: duration,
    },
  );

  return id;
};
