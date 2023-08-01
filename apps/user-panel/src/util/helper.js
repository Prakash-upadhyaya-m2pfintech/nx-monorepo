export const copyToClipboard = (
  textToCopy,
  showErrorMessage,
  showSuccessMessage
) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showSuccessMessage("Text copied to clipboard: ");
    })
    .catch((error) => {
      showErrorMessage("Failed to copy text: ", error);
    });
};
