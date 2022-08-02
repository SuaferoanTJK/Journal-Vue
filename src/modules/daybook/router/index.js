export default {
  name: "daybook",
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ "@/modules/daybook/layouts/DayBookLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "noEntry",
      component: () =>
        import(
          /* webpackChunkName: "noEntry" */ "@/modules/daybook/views/NoEntrySelected.vue"
        ),
    },
    {
      path: ":id",
      name: "entry",
      component: () =>
        import(
          /* webpackChunkName: "entry" */ "@/modules/daybook/views/EntryView.vue"
        ),
      props: (route) => ({
        id: route.params.id,
      }),
    },
  ],
};
