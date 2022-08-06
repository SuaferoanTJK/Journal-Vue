import daybookRouter from "@/modules/daybook/router";

describe("Daybook Router Unit Testing", () => {
  test("Router must have this settings", () => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: expect.any(Array),
    });
  });
  test("Routes are correct", async () => {
    const promiseRoutes = [];
    daybookRouter.children.forEach((child) =>
      promiseRoutes.push(child.component())
    );
    const routes = (await Promise.all(promiseRoutes)).map(
      (route) => route.default.name
    );
    expect(routes).toContain("EntryView");
    expect(routes).toContain("NoEntrySelected");
  });
  test("Entry route should return the route id", () => {
    const route = {
      params: {
        id: "ABC123",
      },
    };
    const entryRoute = daybookRouter.children.find(
      (route) => route.name === "entry"
    );
    expect(entryRoute.props(route)).toEqual({ id: "ABC123" });
  });
});
