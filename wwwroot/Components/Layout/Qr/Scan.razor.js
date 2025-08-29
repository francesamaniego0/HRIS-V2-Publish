// Components/Layout/Qr/Scan.razor.js
import { BrowserQRCodeReader } from 'https://unpkg.com/@zxing/library@latest';

let codeReader = null;

export async function start(videoElementId, dotNetHelper) {
    if (codeReader) return; // already running

    try {
        codeReader = new BrowserQRCodeReader();
        await codeReader.decodeFromVideoDevice(null, videoElementId, (result, err) => {
            if (result) {
                dotNetHelper.invokeMethodAsync("OnQrScanned", result.getText())
                    .catch(e => console.error("dotNet invoke error:", e));
            }
        });
    } catch (ex) {
        console.error("QR start failed:", ex);
        dotNetHelper.invokeMethodAsync("OnQrError", ex?.message ?? "Unknown error")
            .catch(e => console.error("dotNet invoke error:", e));
    }
}

export async function stop() {
    if (codeReader) {
        codeReader.reset();
        codeReader = null;
    }
}
