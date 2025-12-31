import { useEffect, useState } from "react";
import jobProfiles from "./profiles";

export default function Profile() {
  const [profileBol, setProfileBol] = useState({});
  const [profile, setProfile] = useState(jobProfiles);

  const selectedIndex = Object.keys(profileBol).find((key) => profileBol[key]);
  const selectedProfile = profile[selectedIndex];

  useEffect(() => {
    const obj = {};

    profile.forEach((item, id) => {
      obj[id] = id === 0;
    });

    setProfileBol(obj);
  }, [profile]);

  function handleToggle(selected) {
    const newProfile = {};

    profile.forEach((prof, i) => {
      newProfile[i] = i === selected;
    });

    setProfileBol(newProfile);
  }

  return (
    <>
      <div>
        <div>
          {jobProfiles.map((ele, id) => (
            <span key={id} onClick={() => handleToggle(id)}>
              {ele.name}
            </span>
          ))}
        </div>

        <div>
          <div>
            <div>
              <h2>{selectedProfile.position}</h2>
              <button>{selectedProfile.company}</button>
              <span>{selectedProfile.date}</span>
            </div>

            <div>
              <p>{selectedProfile.description}</p>
              redesign..."
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
