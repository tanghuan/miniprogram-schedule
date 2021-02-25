module.exports = {
  pages: ["pages/schedule/index", "pages/calendar/index"],
  tabBar: {
    color: "#707070",
    selectedColor: "#07c160",
    list: [
      {
        pagePath: "pages/schedule/index",
        text: "Schedule",
        iconPath: "/images/schedule.png",
        selectedIconPath: "/images/schedule_selected.png",
      },
      {
        pagePath: "pages/calendar/index",
        text: "Calendar",
        iconPath: "/images/calendar.png",
        selectedIconPath: "/images/calendar_selected.png",
      },
    ],
  },
  window: {
    navigationBarTitleText: "Demo",
    navigationBarBackgroundColor: "#282c34",
  },
};
