import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RoleSelect from "./Auth/RoleSelect";
import CitizenAuth from "./Auth/CitizenAuth";
import OrganizationAuth from "./Auth/OrganizationAuth";
import CitizenHome from "./Auth/CitizenHome";
import OrganizationHome from "./Auth/OrganizationHome";
import OrganizationPrivateRoutes from "./privateRoutes.js/OrganizationPrivateRoutes";
import CitizenPrivateRoutes from "./privateRoutes.js/CitizenPrivateRoutes";
import CitizenViewPendingRequests from "./Screens/CitizenViewPendingRequests";
import CitizenViewAcceptedRequests from "./Screens/CitizenViewAcceptedRequests";
import CitizenViewSingleRequest from "./Screens/CitizenViewSingleRequest";
import OrganizationCreateRequests from "./Screens/OrganizationCreateRequests";
import OrgViewPendingRequests from "./Screens/OrgViewPendingRequests";
import OrgViewAcceptedRequests from "./Screens/OrgViewAcceptedRequests";
import OrgViewCitizen from "./Screens/OrgViewCitizen";
import GovernmentAuth from "./Auth/GovernmentAuth";
import GovernmentPrivateRoutes from "./privateRoutes.js/GovernmentPrivateRoutes";
import GovernmentSetNIC from "./Screens/GovernmentSetNIC";
import GovernmentHome from "./Auth/GovernmentHome";
import GovernmentShowDetails from "./Screens/GovernmentShowDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* common routes */}
          <Route path="/" element={<RoleSelect />} />
          <Route path="/citizenAuth" element={<CitizenAuth />} />
          <Route path="/organizationAuth" element={<OrganizationAuth />} />
          <Route path="/governmentAuth" element={<GovernmentAuth />} />

          {/* Organization's private routes */}
          <Route element={<OrganizationPrivateRoutes />}>
            <Route path="/organizationHome" element={<OrganizationHome />} />
            <Route
              path="/createrequest"
              element={<OrganizationCreateRequests />}
            />
            <Route
              path="/viewpendingrequestsoforg"
              element={<OrgViewPendingRequests />}
            />
            <Route
              path="/viewacceptedrequestsoforg"
              element={<OrgViewAcceptedRequests />}
            />
            <Route
              exact
              path="/viewcitizenfromrequest/:reqid"
              element={<OrgViewCitizen />}
            />
          </Route>

          {/* Citizen's private routes */}
          <Route element={<CitizenPrivateRoutes />}>
            <Route path="/citizenHome" element={<CitizenHome />} />
            <Route
              path="/viewpendingrequestsofcitizen"
              element={<CitizenViewPendingRequests />}
            />
            <Route
              path="/viewacceptedrequestsofcitizen"
              element={<CitizenViewAcceptedRequests />}
            />
            <Route
              exact
              path="/viewrequest/:reqid"
              element={<CitizenViewSingleRequest />}
            />
          </Route>

          {/* Government's private routes */}
          <Route element={<GovernmentPrivateRoutes />}>
            <Route path="/governmentHome" element={<GovernmentHome />} />
            <Route path="/showdetails" element={<GovernmentShowDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
