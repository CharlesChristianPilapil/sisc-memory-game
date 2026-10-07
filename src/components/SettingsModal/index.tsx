import { useEffect, useRef } from "react";
import styles from "./SettingsModal.module.scss";
import SettingsForm from "./SettingsForm";

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        if (open && !dialog.open) {
            dialog.showModal();
        }

        if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby="settings-title"
            onClose={onClose}
            onClick={(event) => {
                if (event.target === dialogRef.current) {
                    onClose();
                }
            }}
        >
            {open && <SettingsForm onClose={onClose} />}
        </dialog>
    );
};

export default SettingsModal;
