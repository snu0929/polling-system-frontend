import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #fefefe;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
const InfoText = styled.p`
  font-size: 16px;
  color: #555;
`;

const PollsSection = styled.div`
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
    color: #333;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      background-color: #f1f1f1;
      margin: 5px 0;
      padding: 10px;
      border-radius: 4px;
    }
  }
`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin: 10px 0;
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [createdPolls, setCreatedPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://polling-system-backend-3jgu.onrender.com/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.user);
        setCreatedPolls(response.data.createdPolls);
        setVotedPolls(response.data.votedPolls);
        console.log(response.data.user);
      } catch (error) {
        console.error(error);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(
        "https://polling-system-backend-3jgu.onrender.com/users/uploadProfilePicture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage(response.data.message);
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: response.data.profilePicture,
      }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setError("Error uploading profile picture");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <ProfileContainer>
      <Title>User Profile</Title>
      {user && (
        <UserInfo>
          {user.profilePicture && (
            <img
              src={`https://polling-system-backend-3jgu.onrender.com/${user.profilePicture}`}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          )}
          <InfoText>
            {" "}
            <strong>Username:</strong> {user.userName}
          </InfoText>
          <InfoText>
            <strong>Email:</strong> {user.email}
          </InfoText>
          <UploadContainer>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Profile Picture</button>
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </UploadContainer>
          <PollsSection>
            <h3>Polls Created</h3>
            {createdPolls.length > 0 ? (
              <ul>
                {createdPolls.map((poll) => (
                  <li key={poll._id}>{poll.title}</li>
                ))}
              </ul>
            ) : (
              <p>No polls created yet.</p>
            )}
            <h3>Polls voted On</h3>
            {votedPolls.length > 0 ? (
              <ul>
                {votedPolls.map((poll) => (
                  <li key={poll._id}>{poll.title}</li>
                ))}
              </ul>
            ) : (
              <p>No polls voted on yet.</p>
            )}
          </PollsSection>
        </UserInfo>
      )}
    </ProfileContainer>
  );
};
