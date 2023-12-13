import { useCallback, useEffect,useRef, useState } from "react";
import { IoMdCloudyNight, IoMdPartlySunny } from "react-icons/io";

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleDarkMode = () => {
    console.log(isDark);
    setIsDark((prev) => !prev);
  };

  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [upperCase, setUpperCase] = useState(true);
  const [lowercase, setLowerCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  // useCallback hook
  const generatePassword = useCallback(() => {
    if (passwordLength <= 5) return;
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) str += "abcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (symbol) str += "'()*+,-./:;<=>?@[]^_`{|}";

    for (let i = 1; i <= passwordLength; i++) {
      let char = Math.random() * str.length + 1;
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [passwordLength, lowercase, number, symbol]);

  // useEffect hook
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);


  // useRef hook
  const passwordRef = useRef()

  // copy function 
  const copytoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
      {/* main container  */}
      <main className={`${isDark ? "bg-[#212121]" : null} w-full h-screen`}>
        {/* Dark mode button starts here  */}
        <nav className="flex justify-end ">
          <button
            onClick={toggleDarkMode}
            type="button"
            className={`select-none mt-3 mr-3 inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold ${isDark ? "bg-white text-black " : "bg-black text-white"} `}
          >
            {isDark ? "Day" : "Night"}
            {isDark ? (
              <IoMdPartlySunny className="ml-2 h-4 w-4" />
            ) : (
              <IoMdCloudyNight className="ml-2 h-4 w-4" />
            )}
          </button>
        </nav>
        {/* Dark mode button ends here  */}

        <div className="md:p-10 p-4 md:mt-12">
          {/* header start */}
          <div className={`${isDark ? "bg-[#0f172a]" : "bg-[#444683]"} max-w-sm p-2 mx-auto rounded-lg`}>
            <div className="text-white font-serif text-center text-4xl flex flex-col gap-1 font-semibold">
              <h2>Password</h2>
              <h2>Generator</h2>
            </div>
            {/* header end */}

            {/* input start  */}
            <div className="my-4 p-1 flex items-center justify-center">
              <input
                type="text"
                className="block w-full py-1 px-2 rounded-l-md text-xl border-none outline-none"
                readOnly
                name="password"
                id="password"
                placeholder="Min Length 6"
                value={password}
                ref={passwordRef}
              />
              <button
              onClick={copytoClipboard} 
              className="select-none bg-blue-500 p-1 rounded-r-md text-xl hover:bg-blue-600 hover:duration-300 active:bg-blue-700 active:duration-0">
                Copy
              </button>
            </div>
            {/* input end  */}

            {/* features starts here  */}
            <div className="text-white font-sans p-2">
              <div className="flex justify-between my-2">
                <label className="text-xl md:text-2xl" htmlFor="length">
                  Password Length :
                </label>
                <input
                  className="md:w-24 w-14 text-black px-3 text-lg font-bold rounded-md"
                  type="number"
                  onChange={(e) => setPasswordLength(e.target.value)}
                  value={passwordLength}
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label className="text-xl md:text-2xl" htmlFor="length">
                  Include Uppercase Letter
                </label>
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  defaultChecked={upperCase}
                  onChange={() => {
                    setUpperCase((prev) => !prev);
                  }}
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label className="text-xl md:text-2xl" htmlFor="length">
                  Include Lowercase Letter
                </label>
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  defaultChecked={lowercase}
                  onChange={() => {
                    setLowerCase((prev) => !prev);
                  }}
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label className="text-xl md:text-2xl" htmlFor="length">
                  Include Numbers
                </label>
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  defaultChecked={number}
                  onChange={() => {
                    setNumber((prev) => !prev);
                  }}
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label className="text-xl md:text-2xl" htmlFor="length">
                  Include Symbols
                </label>
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  defaultChecked={symbol}
                  onChange={() => {
                    setSymbol((prev) => !prev);
                  }}
                />
              </div>
            </div>
            {/* features ends here  */}

            {/* generate button starts here  */}
            <div className="flex justify-center items-center my-4">
              <button
                onClick={generatePassword}
                className="font-semibold text-black bg-blue-700 py-1 px-4 rounded-md text-xl hover:bg-blue-600 hover:duration-300 active:bg-blue-700 active:duration-0"
              >
                Generate Password
              </button>
            </div>
            {/* generate button ends here  */}
          </div>
        </div>
      </main>
    </>
  );
}
export default App;
