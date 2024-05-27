import axios from "axios";

export var getApiCall = () => {
  return axios.create({
    baseURL: "https://hackathon-reg-malayasia.ew.r.appspot.com/",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export async function sendLoginRequest(loginJson) {
  try {
    const responseData = await getApiCall().post(`api/users/login`, loginJson);
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function sendRegisterRequest(loginJson) {
  try {
    const responseData = await getApiCall().post(
      `api/users/register`,
      loginJson
    );
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function sendSetProfileRequest(loginJson) {
  try {
    const responseData = await getApiCall().post(
      `api/profiles/profile/update`,
      loginJson
    );
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getTeams() {
  try {
    const responseData = await getApiCall().get(`api/teams`);
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getTeamMembers(teamId) {
  try {
    const responseData = await getApiCall().get(`api/teams/` + teamId);
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getIsUserPartOfTeam() {
  try {
    const responseData = await getApiCall().get(`/is-part-of-team`);
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function sendPostJoinTeam(teamId, userId) {
  try {
    const responseData = await getApiCall().post(`/team/` + teamId + `/join`, {
      userId,
    });
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUser(id) {
  try {
    const responseData = await getApiCall().get(`participant/` + id);
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getParticipants() {
  try {
    const responseData = await getApiCall().get(`participants`);
    return responseData;
  } catch (err) {
    throw new Error(err.message);
  }
}
