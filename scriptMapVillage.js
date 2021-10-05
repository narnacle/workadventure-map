var zoneOfficeName = "popupOfficeZone";
var zoneEventName = "popupEventZone";
var zoneSchoolName = "popupSchoolZone";
var zoneTCMName = "popupTCMZone";

var urlPricing = "https://narnacle.shop/";
var urlSchoolOffer = "https://narnacle.tips/";
var urlEvent = "https://narnaclenl.backme.org/";
var currentPopup = undefined;

WA.onEnterZone(zoneOfficeName, () => {
   currentPopup =  WA.openPopup("popUpOffice","Je kunt merchandise kopen op Narnacle.Shop",[
        {
            label: "Bekijk het assortiment",
            className: "popUpElement",
            callback: (popup => {
                WA.openTab(urlPricing);
            })
        }]);
})

WA.onEnterZone(zoneEventName, () => {
    currentPopup =  WA.openPopup("popUpEvent","Je kunt ons WorkAdventure Project steunen op BackMe.org",[
        {
            label: "Zie de pagina",
            className: "popUpElement",
            callback: (popup => {
                WA.openTab(urlEvent);
            })
        }]);
})

WA.onEnterZone(zoneTCMName, () => {
    currentPopup =  WA.openPopup("popUpTCM","Ontmoet het WorkAdventure-team in ons kantoor!",[]);
})


WA.onEnterZone(zoneSchoolName, () => {
    currentPopup =  WA.openPopup("popUpSchool","WorkAdventure is momenteel gratis voor iedereen! Houd WorkAdventure draaiende",[
        {
            label: "Doneer aan WorkAdventure",
            className: "popUpElement",
            callback: (popup => {
                WA.openTab(urlSchoolOffer);
            })
        }]);
})

WA.onLeaveZone(zoneSchoolName, closePopUp)

WA.onLeaveZone(zoneTCMName, closePopUp)

WA.onLeaveZone(zoneEventName, closePopUp)

WA.onLeaveZone(zoneOfficeName, closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
