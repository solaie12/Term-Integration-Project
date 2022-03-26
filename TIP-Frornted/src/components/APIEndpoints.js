export const dev = {
  baseURL: "http://localhost:8000/",
  upload: "incidents/insert/",
  login: "auth/jwt/create/",
  register: "auth/users/",
  userInfo: "auth/users/me/",

  incidentsWeekly: "incidents/weekly/",
  incidentsPerMonthSummary: "incidents/kpi/num_incident/2021/",
  monthlyIncidentsByCause: "incidents/monthly/incidentType/2021/",

  incidentsKPISLAInsight: "incidents/kpi/SLA/2021/",

  incidentsMonthlyTrend: "incidents/monthly/",
  criticalIncidentsTrend: "incidents/kpi/SLA/"
};

export const prod = {
  baseURL: "https://tip-iberia-project.herokuapp.com/",
  upload: "incidents/insert/",
  login: "auth/jwt/create/",
  register: "auth/users/",
  userInfo: "auth/users/me/",

  incidentsWeekly: "incidents/weekly/",
  incidentsPerMonthSummary: "incidents/kpi/num_incident/2021/",
  monthlyIncidentsByCause: "incidents/monthly/incidentType/2021/",

  incidentsKPISLAInsight: "incidents/kpi/SLA/2021/",

  incidentsMonthlyTrend: "incidents/monthly/",
  criticalIncidentsTrend: "incidents/kpi/SLA/"
};
