import { useEffect, useState } from "react";
import { get_current, update_current } from "../services/auth.services";
import Button from "../components/Button";
import Input from "../components/FormInput/Elements/input";
import LoadingScreen from "../fragments/LoadingScreen";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [succesUpdate, setSuccessUpdate] = useState(null);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      get_current(token.token, (success, response) => {
        if (success) {
          setCurrentUser(response);
        } else {
          console.log(response);
        }
      });
    } else {
      window.location = "/login";
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    update_current(data, token.token, (success, response) => {
      if (success) {
        setSuccessUpdate(true);
      } else {
        setSuccessUpdate(false);
      }
    });
  };

  return (
    <>
      {currentUser == null ? (
        <div className="flex flex-col items-center justify-center col-span-4 h-screen">
          <LoadingScreen />
        </div>
      ) : (
        <>
          <div className="col-span-2 h-screen mt-7">
            <div className="ml-7">
              <div className="bg-zinc-900 overflow-hidden rounded-b-md">
                <div className="py-1 rounded-t-md bg-blue-600 h-full"></div>
                <div className="bg-zinc-900 rounded mb-7">
                  {currentUser && (
                    <p
                      className="text-gray-300 text-center text-2xl pt-5 font-bold"
                      style={{ textTransform: "capitalize" }}
                    >
                      {currentUser.data.name}'s Profile
                    </p>
                  )}
                  {succesUpdate == true && (
                    <div className="flex justify-around">
                      <p className="mt-5 bg-green-500 px-24 py-1 rounded">
                        The data has been update successfully
                      </p>
                    </div>
                  )}
                  {succesUpdate == false && (
                    <div className="flex justify-around">
                      <p className="mt-5 bg-red-500 px-24 py-1 rounded">
                        The data has been update failed
                      </p>
                    </div>
                  )}
                  {currentUser && (
                    <form onSubmit={handleUpdate}>
                      <div className="mt-5">
                        <div className="mx-7">
                          <Input
                            type="text"
                            placeholder="Fullname"
                            name="name"
                            valueData={currentUser.data.name}
                            bg="bg-zinc-800"
                          />
                        </div>
                        <div className="mt-3 mx-7">
                          <Input
                            type="text"
                            placeholder="Email Address"
                            name="email"
                            valueData={currentUser.data.email}
                            bg="bg-zinc-800"
                          />
                        </div>
                        <div className="mt-3 mx-7">
                          <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            bg="bg-zinc-800"
                          />
                        </div>
                        <div className="mt-5 mx-7 text-center">
                          <Button type="submit" weight="px-12" height="py-1">
                            Update
                          </Button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-7">
            <div className="mr-7">
              <div className="bg-zinc-900 overflow-hidden rounded-b-md">
                <div className="py-1 rounded-t-md bg-green-600 h-full"></div>
                <div className="bg-zinc-900 rounded mb-7">
                  <p className="text-gray-300 text-center text-2xl pt-5 font-bold">
                    Recent Activities
                  </p>
                  <div className="text-gray-300 py-3 bg-zinc-800 px-7 ml-7 mr-7 rounded-md mt-7">
                    User added new task
                  </div>
                  <div className="text-gray-300 py-3 bg-zinc-800 px-7 ml-7 mr-7 rounded-md mt-7">
                    User added new task
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
