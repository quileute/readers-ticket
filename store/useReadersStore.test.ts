import { describe, it, expect, beforeEach } from "vitest";
import useReadersStore from "./useReadersStore";
import { plans } from "@/data/plans";
import { features } from "@/data/features";

describe("Readers Store", () => {
  beforeEach(() => {
    useReadersStore.setState({
      plans,
      features,
      selectedPlanId: null,
      extraFeatureIds: [],
      printRequestId: 0,
    });
  });

  describe("selectPlan", () => {
    it("selects plan and resets extras", () => {
      useReadersStore.setState({
        extraFeatureIds: ["audiobooks"],
        printRequestId: 5,
      });

      useReadersStore.getState().selectPlan("reader");

      expect(useReadersStore.getState().selectedPlanId).toBe("reader");
      expect(useReadersStore.getState().extraFeatureIds).toEqual([]);
      expect(useReadersStore.getState().printRequestId).toBe(0);
    });
  });

  describe("total", () => {
    it("calculates base price", () => {
      useReadersStore.getState().selectPlan("reader");
      expect(useReadersStore.getState().total()).toBe(9);
    });

    it("calculates price with extras", () => {
      useReadersStore.setState({
        selectedPlanId: "reader",
        extraFeatureIds: ["audiobooks"],
      });
      expect(useReadersStore.getState().total()).toBe(16);
    });
  });

  describe("reset", () => {
    it("resets all state", () => {
      useReadersStore.setState({
        selectedPlanId: "reader",
        extraFeatureIds: ["audiobooks"],
        printRequestId: 5,
      });

      useReadersStore.getState().reset();

      expect(useReadersStore.getState().selectedPlanId).toBeNull();
      expect(useReadersStore.getState().extraFeatureIds).toEqual([]);
      expect(useReadersStore.getState().printRequestId).toBe(0);
    });
  });

  describe("requestPrint", () => {
    it("increments print request ID", () => {
      const initialId = useReadersStore.getState().printRequestId;

      useReadersStore.getState().requestPrint();

      expect(useReadersStore.getState().printRequestId).toBe(initialId + 1);
    });
  });

  describe("toggleFeature", () => {
    beforeEach(() => {
      useReadersStore.setState({
        selectedPlanId: "bookworm",
        plans: [
          {
            id: "bookworm",
            name: "Bookworm",
            price: 19,
            description: "...",
            image: "",
            features: [],
            includedFeatureIds: ["users-4", "basic-formats"],
          },
        ],
        features: [
          { id: "users-2", category: "Users", label: "2 users", price: 0 },
          { id: "users-4", category: "Users", label: "4 users", price: 5 },
          { id: "users-8", category: "Users", label: "8 users", price: 10 },
          {
            id: "audiobooks",
            category: "Audio",
            label: "Audiobooks",
            price: 7,
          },
          {
            id: "basic-formats",
            category: "Formats",
            label: "EPUB, FB2, PDF",
            price: 0,
          },
        ],
        extraFeatureIds: [],
      });
    });

    it("does nothing when no plan selected", () => {
      useReadersStore.setState({ selectedPlanId: null });
      const initialState = useReadersStore.getState();

      useReadersStore.getState().toggleFeature("users-8");

      expect(useReadersStore.getState()).toEqual(initialState);
    });

    it("toggles non-exclusive extra feature", () => {
      // add feature
      useReadersStore.getState().toggleFeature("audiobooks");
      expect(useReadersStore.getState().extraFeatureIds).toContain(
        "audiobooks",
      );

      // remove feature
      useReadersStore.getState().toggleFeature("audiobooks");
      expect(useReadersStore.getState().extraFeatureIds).not.toContain(
        "audiobooks",
      );
    });

    it("does nothing for included non-exclusive feature", () => {
      const initialExtras = useReadersStore.getState().extraFeatureIds;
      useReadersStore.getState().toggleFeature("basic-formats");
      expect(useReadersStore.getState().extraFeatureIds).toEqual(initialExtras);
    });

    it("upgrades exclusive feature above included", () => {
      // bookworm includes users-4, we can select only users-8
      useReadersStore.getState().toggleFeature("users-8");
      expect(useReadersStore.getState().extraFeatureIds).toEqual(["users-8"]);
    });

    it("does not allow downgrading exclusive feature below included", () => {
      const initialExtras = useReadersStore.getState().extraFeatureIds;

      // try to toggle users-2 which is below included users-4
      useReadersStore.getState().toggleFeature("users-2");

      expect(useReadersStore.getState().extraFeatureIds).toEqual(initialExtras);
    });

    it("downgrades when clicking included exclusive feature with upgrades", () => {
      useReadersStore.setState({ extraFeatureIds: ["users-8"] });

      useReadersStore.getState().toggleFeature("users-4");

      expect(useReadersStore.getState().extraFeatureIds).toEqual([]);
    });
  });
});
