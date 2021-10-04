var isFirstTimeTuto = false;
var textFirstPopup = 'Hallo ! Zo start je een discussie met iemand! Je mag maximaal 4 in een bubbel zitten.';
var textSecondPopup = 'U kunt de chat ook gebruiken om te communiceren!';
var targetObjectTutoBubble ='Tutobubble';
var targetObjectTutoChat ='tutoChat';
var targetObjectTutoExplanation ='tutoExplanation';
var popUpExplanation = undefined;
var enterSoundUrl = "webrtc-in.mp3";
var exitSoundUrl = "webrtc-out.mp3";
var soundConfig = {
    volume : 0.2,
    loop : false
}
function launchTuto (){
    WA.openPopup(targetObjectTutoBubble, textFirstPopup, [
        {
            label: "Volgende",
            className: "popUpElement",
            callback: (popup) => {
                popup.close();

                WA.openPopup(targetObjectTutoChat, textSecondPopup, [
                    {
                        label: "Chat Openen",
                        className: "popUpElement",
                        callback: (popup1) => {
                            WA.sendChatMessage("Hé, je kunt hier ook praten!", 'WA-Gids');
                            popup1.close();
                            WA.openPopup("TutoFinal","je bent klaar om te gaan! Ga door de poort om het dev-team te ontmoeten en ontdek de functies!",[
                                {
                                    label: "Begrepen!",
                                    className : "success",callback:(popup2 => {
                                        popup2.close();
                                        WA.restorePlayerControl();
                                        WA.loadSound(winSoundUrl).play(soundConfig);
                                    })
                                }
                            ])
                        }
                    }

                ])
            }
        }
    ]);
    WA.disablePlayerControl();

}


WA.onEnterZone('popupZone', () => {
    WA.displayBubble();
    WA.loadSound(enterSoundUrl).play(soundConfig);
    if (!isFirstTimeTuto) {
        isFirstTimeTuto = true;
        launchTuto();
    }
    else {
        popUpExplanation = WA.openPopup(targetObjectTutoExplanation, 'Wil je de uitleg nog eens bekijken?', [
            {
                label: "Nee",
                className: "error",
                callback: (popup) => {
                    popup.close();
                }
            },
            {
                label: "Ja",
                className: "success",
                callback: (popup) => {
                    popup.close();
                    launchTuto();
                }
            }
        ])
    }
});

WA.onLeaveZone('popupZone', () => {
    if (popUpExplanation !== undefined) popUpExplanation.close();
    WA.removeBubble();
    WA.loadSound(exitSoundUrl).play(soundConfig);
})
