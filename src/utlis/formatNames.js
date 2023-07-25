export const formatTimeOffs = (name) => {
  switch (name) {
    case "OccasionalLeave":
      return "Occasional Leave";
    case "SickLeave":
      return "Sick Leave";
    case "Vacation":
      return "Vacation";
    case "OnDemand":
      return "On Demand";
  }
};

export const formatToPolish = (name) => {
  switch (name) {
    case "OccasionalLeave":
      return "Okazjonalny";
    case "SickLeave":
      return "Chorobowy";
    case "Vacation":
      return "Wakacje";
    case "OnDemand":
      return "Na żądanie";
  }
};

export const format = (parametr) => {
  let result;
  switch (parametr) {
    case "OccasionalLeave":
      result = "Okazjonalny";
      break;
  }

  return result;
};
