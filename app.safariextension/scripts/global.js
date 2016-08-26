'use strict';

console.log('=====> safari.applicaiton.browserWindows[0].activeTab.url in global.js: ', safari.application.browserWindows[0].activeTab.url);
// safari.application.browserWindows[0].activeTab.close();

var handleChangeEvent, openOptionsPage, openTab, version;

function handleChangeEvent(event) {
  if (event.key === 'options' && event.newValue === true) {
    safari.extension.settings.options = false;
    openOptionsPage();
  }
};

function openTab(url) {
  var tab;
  if (safari.application.activeBrowserWindow) {
    tab = safari.application.activeBrowserWindow.openTab('foreground');
  } else {
    tab = safari.application.openBrowserWindow().activeTab;
  }
  tab.url = url;
};

function openOptionsPage() {
  openTab(safari.extension.baseURI + 'options.html');
};

version = localStorage.getItem('version');

if (!version) {
  openOptionsPage();
}

localStorage.setItem('version', safari.extension.bundleVersion);

safari.extension.settings.addEventListener('change', handleChangeEvent, false);

console.log('\'Allo \'Allo!');
