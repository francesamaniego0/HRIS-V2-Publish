window.qrScanner = (function () {
    alert("Hellow");
    let codeReader;
    let videoElement;
    let dotnetRef;

    return {
        init: async function (video, dotnet) {
            videoElement = video;
            dotnetRef = dotnet;
            codeReader = new ZXing.BrowserQRCodeReader();

            // ✅ Use instance method
            const devices = await codeReader.listVideoInputDevices();
            return devices.map(d => ({ deviceId: d.deviceId, label: d.label }));
        },

        start: async function (deviceId) {
            if (!codeReader) return;

            await codeReader.decodeFromVideoDevice(deviceId, videoElement, (result, err) => {
                if (result) {
                    dotnetRef.invokeMethodAsync("OnQrScanned", result.text);
                }
            });
        },

        stop: function () {
            if (codeReader) {
                codeReader.reset();
            }
        },
        showResult: function () {
            var modalEl = document.getElementById('qrResultModal');
            var modal = new bootstrap.Modal(modalEl);
            modal.show();
        }
    };
})();

