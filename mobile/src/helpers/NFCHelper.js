import NfcManager from "react-native-nfc-manager";

let hasStartedNFC = false;

const registerTagEvent = (callback = null) => {
  NfcManager.registerTagEvent(tag => {
    if (callback) {
      callback(tag);
    }
  });
};

const unregisterTagEvent = () => {
  NfcManager.unregisterTagEvent();
};

const startNFCManager = async function() {
  try {
    const result = await NfcManager.start();

    return {
      Success: `Sucesso ${result}`
    };
  } catch (error) {
    return { Error: error };
  }
};

const stopNFCManager = () => {
  NfcManager.stop();
};

export const isNFCSupported = async () => NfcManager.isSupported();

export const startNFC = async callback => {
  const isSupported = await isNFCSupported();

  if (isSupported) {
    const startResult = await startNFCManager();

    if (startResult.Success) {
      registerTagEvent(callback);
      hasStartedNFC = true;
      return true;
    }
    return callback({
      Error: {
        Title: "Ocorreu um erro ao iniciar o NFC Manager",
        Message: startResult.Error
      }
    });
  }
  return callback({
    Error: {
      Title: "Dispositivo sem suporte para NFC",
      Message:
        "O seu dispositivo não possui suporte para leitura da tag NFC. Tente outro dispositivo."
    }
  });
};

export const stopNFC = () => {
  if (hasStartedNFC) {
    unregisterTagEvent();
    stopNFCManager();
    hasStartedNFC = false;
  }
};
