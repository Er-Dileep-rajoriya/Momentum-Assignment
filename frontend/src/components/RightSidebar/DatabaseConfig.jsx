import React, { useEffect, useState } from "react";

function DatabaseConfig({ config, setConfig }) {
  const [isDb, setIsDb] = useState(false);
  const [dbInfo, setDbInfo] = useState({
    username: "",
    hostname: "",
    password: "",
  });

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      is_db_mocked: isDb,
      db_config: !isDb
        ? {
            username: dbInfo.username,
            password: dbInfo.password,
            hostname: dbInfo.hostname,
          }
        : { username: "", password: "" }, // Empty object when mocking is enabled
    }));
  }, [isDb, dbInfo, setConfig]);

  function handleChangeDBConfig(e) {
    setDbInfo({ ...dbInfo, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col gap-5 pb-20">
      {/* Database Mocking Option */}
      <div className="flex flex-col gap-2">
        <p className="mt-4 font-medium">Databases</p>
        <p className="text-[#B7B7B7]">Select if you want to mock databases</p>
        <div className="flex flex-row gap-3 pl-1">
          <input
            type="checkbox"
            className="scale-140 accent-blue-500"
            checked={isDb}
            onChange={() => setIsDb(true)}
          />
          <span>I want to mock databases</span>
        </div>
        <div className="flex flex-row gap-3 pl-1">
          <input
            type="checkbox"
            className="scale-140 accent-blue-500"
            checked={!isDb}
            onChange={() => setIsDb(false)}
          />
          <span>I don’t want to mock database</span>
        </div>
      </div>

      {/* Database Configuration Section */}
      <div className="flex flex-col gap-3">
        <p className={`font-medium ${isDb ? "text-gray-400" : ""}`}>
          Database Configurations
        </p>

        <div className="flex flex-col gap-4">
          {/* Database User */}
          <div className="relative w-full">
            <input
              type="text"
              id="database_user"
              name="username"
              value={dbInfo.username}
              onChange={handleChangeDBConfig}
              disabled={isDb}
              className={`peer w-full pt-4 pb-2 pl-4 pr-4 text-xl text-white bg-[#595858] rounded-lg border border-[#FFAD62] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${
                isDb ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="Database User"
            />
          </div>

          {/* Database Password */}
          <div className="relative w-full">
            <input
              type="text"
              id="database_password"
              name="password"
              value={dbInfo.password}
              onChange={handleChangeDBConfig}
              disabled={isDb}
              className={`peer w-full pt-4 pb-2 pl-4 pr-4 text-xl text-white bg-[#595858] rounded-lg border border-[#FFAD62] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${
                isDb ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="User Password"
            />
          </div>

          {/* Database Hostname */}
          <div className="relative w-full">
            <input
              type="text"
              id="database_hostname"
              name="hostname"
              value={dbInfo.hostname}
              onChange={handleChangeDBConfig}
              disabled={isDb}
              className={`peer w-full pt-4 pb-2 pl-4 pr-4 text-xl text-white bg-[#595858] rounded-lg border border-[#FFAD62] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${
                isDb ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="User hostname"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatabaseConfig;
