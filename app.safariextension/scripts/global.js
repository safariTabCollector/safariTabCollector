'use strict';

console.log('=====> safari.applicaiton.browserWindows[0].tabs[1] in global.js: ', safari.application.browserWindows[0].tabs[1]);
// safari.application.browserWindows[0].activeTab.close();
safari.application.browserWindows[0].tabs[1].activate();
console.log('=====> all of the tabs everywhere!!!!!!!: ', gatherTabs());

var handleChangeEvent, openOptionsPage, openTab, version;

function handleChangeEvent(event) {
  if (event.key === 'options' && event.newValue === true) {
    safari.extension.settings.options = false;
    openOptionsPage();
  }
};

function gatherTabs() {
  let allTabs = [];
  safari.application.browserWindows.forEach(browserWindow => {
    browserWindow.tabs.forEach(tab => allTabs.push({title: tab.title, url: tab.url}));
  });
  return allTabs;
}

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
