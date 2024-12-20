"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AlignJustify,
  Calculator,
  LoaderCircle,
  Moon,
  Sun,
  TriangleAlert,
} from "lucide-react";

// const API_URL = "http://127.0.0.1:8000";
const API_URL = "https://teachertracker.onrender.com";

export default function Home() {
  const [teacherName, setTeacherName] = useState("");
  const [roomNumber, setRoomNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [teacherReportResponseMessage, setTeacherReportResponseMessage] =
    useState("");
  const [teacherFindResponseMessage, setTeacherFindResponseMessage] =
    useState("");
  const [roomFindResponseMessage, setRoomFindResponseMessage] = useState("");
  const [teachers, setTeachers] = useState<string[]>([]);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidRoom, setIsValidRoom] = useState(false);
  const [showTeacherNameSuggestions, setShowSuggestions] = useState(false);
  const [page, setPage] = useState("teacher-find");
  const { setTheme, resolvedTheme } = useTheme();
  const inputAreaRef = React.useRef<HTMLDivElement>(null);

  const filteredNames = teachers.filter((name) => name.includes(teacherName));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputAreaRef.current &&
        !inputAreaRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .catch((err) =>
          console.error("Service worker registration failed:", err),
        );
    } else console.log("Service worker not supported");

    fetchTeachers();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleTeacherNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTeacherName(e.target.value);
    setIsValidName(teachers.includes(e.target.value));
    setShowSuggestions(true);
  }

  function handleRoomNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRoomNumber(parseInt(e.target.value));
    setIsValidRoom(
      e.target.value.length > 0 &&
        !isNaN(parseInt(e.target.value)) &&
        e.target.value.length < 4,
    );
  }

  function handleTeacherSelectName(name: string) {
    setTeacherName(name);
    setIsValidName(true);
    setShowSuggestions(false);
  }

  async function fetchTeachers() {
    try {
      const response = await fetch(`${API_URL}/teachers`);

      const data: { teachers: string[] } = await response.json();
      setTeachers(data["teachers"]);
    } catch {
    } finally {
      setIsLoading(false);
    }
    // await new Promise((resolve) => setTimeout(resolve, 200));
    // setTeachers([
    //   "ליבנה ימית",
    //   "כהן דינה",
    //   "פוטרן ליסה",
    //   "ארז אורנה",
    //   "עדני טיבה",
    //   "אבן חיים איריס",
    //   "שגב שרה",
    //   "פיסיקה מכלוף ראשא",
    //   "קורל גת",
    //   "צ'רטוק אלינור",
    //   "אילוביץ ויקטור",
    //   "מירסקי אורה",
    //   "עקיבא הילה",
    //   "שלמוביץ אביה",
    //   "פיסיקה עודד כנען",
    //   "מגרלה גל",
    //   "נושימובסקי דניאל",
    //   "ביק אלינה",
    //   "פריזה יעל",
    //   "בלומנפלד נאוה",
    //   "אלימלך איב",
    //   "אברהם ליאור",
    //   "ישראלי יונתן",
    //   "שחם כפיר חנה",
    //   "כץ מרינה",
    //   "גולדשטיין סמדר",
    //   "רם מיכל",
    //   "אברמוביץ אמיל",
    //   "הרמן קופפר אודליה",
    //   "חיימוביץ ג'ולי",
    //   "פיסיקה  דוברובין דריה",
    //   "ליפשיץ משה",
    //   "יוגד אמנון",
    //   "שבירו עדי",
    //   "אבן חן ארבל",
    //   "סויד גרינברג יפית",
    //   "צבי יובל",
    //   "לרנר נטלי",
    //   "ניומן אלעזר",
    //   "בלס יובל",
    //   "מסארוה מייס",
    //   "השחר שלי",
    //   "גולדה רנית",
    //   "רידר אורי",
    //   "פסלב שמעון",
    //   "הרוש שלומי",
    //   "זנד מרקוס ליזי",
    //   "שכנר לילי",
    //   "מרמן אלכס",
    //   "דיוויס חמוטל",
    //   "ביטרן מרג'",
    //   "גבאי מיכאל",
    //   "לוריה ורד",
    //   "שביט אופיר",
    //   "טריפמן יובל",
    //   "מאור לירז",
    //   "שמש רותם",
    //   "ממן תמר",
    //   "גרשוני אריק",
    //   "ארדרייך איריס",
    //   "לייבוביץ ארמנד",
    //   "בלהסן מיקי",
    //   "אייזק שני",
    //   "ניר גנש ענת",
    //   "פיסיקה פתאל יוחאי רועי",
    //   "ונטורה אלן מחול",
    //   "פיסיקה ערן",
    //   "שלייפר נועה",
    //   "רייזמן גליה",
    //   "שאול לימור",
    //   "דוד טל היסטוריה",
    //   "קורן טל",
    //   "פיסיקה סאיג ליליאן",
    //   "גפן זהבית",
    //   "מאיר רחל",
    //   "זהבי יוסי",
    //   "הירש שמואל",
    //   "קופר מיכל",
    //   "זוננשטרן איתי",
    //   "סילפין אלון",
    //   "עובד רונן",
    //   "לוי ציפי",
    //   "ריצר שרונה",
    //   "לוקוף יעל",
    //   "ורפולר נירה",
    //   "גרוסי יעל",
    //   "יוסף לימור",
    //   "טאטי סיון",
    //   "קולמן שחר",
    //   "גולדשטיין אורי",
    //   "איתי קולדרצוב",
    // ]);
  }

  function updateSelectedHour() {
    let selectedHour: number = 0;

    const timeRanges = [
      { hour: 7, minute: 30 },
      { hour: 8, minute: 0 },
      { hour: 8, minute: 40 },
      { hour: 9, minute: 30 },
      { hour: 10, minute: 30 },
      { hour: 11, minute: 25 },
      { hour: 12, minute: 30 },
      { hour: 13, minute: 20 },
      { hour: 14, minute: 20 },
      { hour: 15, minute: 10 },
      { hour: 16, minute: 0 },
      { hour: 16, minute: 45 },
      { hour: 17, minute: 30 },
      { hour: 18, minute: 15 },
      { hour: 19, minute: 0 },
    ];

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    const currentTimeInMinutes = currentHour * 60 + currentMinutes;

    if (currentHour < 7 || (currentHour === 7 && currentMinutes < 30)) {
      selectedHour = 0;
      return;
    }

    for (let i = 0; i < timeRanges.length - 1; i++) {
      const startTime = timeRanges[i].hour * 60 + timeRanges[i].minute;
      const endTime = timeRanges[i + 1].hour * 60 + timeRanges[i + 1].minute;

      if (currentTimeInMinutes >= startTime && currentTimeInMinutes < endTime) {
        selectedHour = i;
        return;
      }
    }

    selectedHour = timeRanges.length - 1;

    return selectedHour;
  }

  async function findTeacher() {
    setIsLoading(true);
    const selectedHour = updateSelectedHour();

    try {
      const response = await fetch(
        `${API_URL}/teacher/${teacherName}/${selectedHour}`,
      );

      const data: { room: string | null } = await response.json();
      const room = data["room"];

      if (room == null)
        setTeacherFindResponseMessage(
          `לא נמצא מידע על ${teacherName} בשעה ${selectedHour}.`,
        );
      else setTeacherFindResponseMessage(`${teacherName} בחדר ${room}.`);
    } catch {
      setTeacherFindResponseMessage(`שגיאה במערכת. נסה שוב מאוחר יותר.`);
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const res = await fetch("", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name,
    //       time: new Date().toISOString(),
    //     }),
    //   });

    //   const data = await res.json();

    //   const isTeaching = data.teaching;
    //   const suspectedLocation = data.suspected_location;
    //   const isInSchool = data.is_in;

    //   let responseMessage = `${name} ${!isTeaching && "לא "}מלמד/ת ${isInSchool ? "עכשיו" : "היום"}.`;
    //   if (isTeaching) responseMessage += ` ${suspectedLocation}.`;

    //   setTeacherFindResponseMessage(responseMessage);
    // } catch (e) {
    //   alert("oops, " + e);
    // }
    // setIsLoading(false);
  }

  async function findRoom() {
    setIsLoading(true);
    const selectedHour = updateSelectedHour();

    try {
      const response = await fetch(`${API_URL}/empty-rooms/${selectedHour}`);

      const data: { "empty-rooms": string[] } = await response.json();
      const rooms = data["empty-rooms"];
      const roomsString = rooms.join(", ");

      setRoomFindResponseMessage(`חדרים פנויים: ${roomsString}.`);
    } catch {
      setRoomFindResponseMessage(`שגיאה במערכת. נסה שוב מאוחר יותר.`);
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const res = await fetch("", {
    //     method: "GET",
    //   });

    //   const data = await res.json();

    //   const room = data.room;

    //   setRoomFindResponseMessage(`חדר ${room} פנוי עכשיו.`);
    // } catch (e) {
    //   alert("oops, " + e);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  async function reportTeacher() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTeacherReportResponseMessage(`דווח בהצלחה.`);
    }, 500);
  }

  return (
    <React.Fragment>
      {teachers.length > 0 ? (
        <React.Fragment>
          {resolvedTheme === "dark" ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Moon
                  className="absolute top-8 right-8 cursor-pointer"
                  width={25}
                  height={25}
                />
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[90vw] sm:max-w-96">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    בטוח/ה?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-right">
                    מעבר למצב בהיר היא פעולה מסוכנת ביותר שעלולה לגרום לעיוורון
                    לטווח ארוך ו/או לאובדן ראיה תמידי.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="ml-0 sm:ml-2 hover:bg-inherit">
                    בטל
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setTheme("light");
                    }}
                  >
                    כן, עבור
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Sun
              className="absolute top-8 right-8 cursor-pointer"
              onClick={() => setTheme("dark")}
              width={25}
              height={25}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute left-[calc(50vw-12.5px)] top-8 outline-none">
              <AlignJustify width={25} height={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-center" dir="rtl">
                בחר מצב:
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setPage("teacher-find");
                }}
                className={
                  navigationMenuTriggerStyle() +
                  " w-full focus:bg-inherit hover:bg-inherit"
                }
              >
                מציאת מורה
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setPage("room-find");
                }}
                className={
                  navigationMenuTriggerStyle() +
                  " w-full focus:bg-inherit hover:bg-inherit"
                }
              >
                מציאת חדר פנוי
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TriangleAlert
            className="absolute top-8 left-8 cursor-pointer"
            onClick={() => {
              setPage("report-teacher");
            }}
            width={25}
            height={25}
          />
          <Calculator
            className="absolute bottom-8 right-8 cursor-pointer"
            onClick={() => {
              setPage("calculator");
            }}
            width={25}
            height={25}
          />
          <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center flex-col gap-4 p-8 max-w-96">
              {page === "teacher-find" ? (
                <React.Fragment>
                  <div className="text-center">
                    <p>{"בחר מורה בכדי למצוא אותו/ה:"}</p>
                  </div>
                  <div className="flex justify-center items-center flex-row gap-2">
                    <div className="relative" ref={inputAreaRef}>
                      <Input
                        type="text"
                        placeholder="איתי קולדרצוב"
                        value={teacherName}
                        onChange={handleTeacherNameChange}
                        onFocus={() => setShowSuggestions(true)}
                        disabled={isLoading}
                      />
                      {showTeacherNameSuggestions && teacherName && (
                        <div className="absolute w-full z-50 mt-1">
                          <Command className="rounded-lg border shadow-md">
                            <CommandList className="overflow-hidden">
                              <CommandGroup>
                                {filteredNames.length === 0 ? (
                                  <CommandEmpty>
                                    לא נמצא מורה עם השם שנכתב.
                                  </CommandEmpty>
                                ) : (
                                  filteredNames.map((name) => (
                                    <CommandItem
                                      key={name}
                                      value={name}
                                      onSelect={() =>
                                        handleTeacherSelectName(name)
                                      }
                                      className="cursor-pointer"
                                    >
                                      {name}
                                    </CommandItem>
                                  ))
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={findTeacher}
                      disabled={isLoading || !isValidName}
                      variant="outline"
                      className="hover:bg-inherit"
                    >
                      חפש
                    </Button>
                  </div>
                  {teacherFindResponseMessage != "" && (
                    <Alert className="text-right animate-expand-vertical">
                      {teacherFindResponseMessage}
                    </Alert>
                  )}
                </React.Fragment>
              ) : page === "room-find" ? (
                <React.Fragment>
                  <div className="flex justify-center items-center flex-row">
                    <Button
                      onClick={findRoom}
                      disabled={isLoading}
                      variant="outline"
                      className="hover:bg-inherit"
                    >
                      מצא חדר פנוי
                    </Button>
                  </div>
                  {roomFindResponseMessage != "" && (
                    <Alert className="text-right animate-expand-vertical">
                      {roomFindResponseMessage}
                    </Alert>
                  )}
                </React.Fragment>
              ) : page === "settings" ? (
                <React.Fragment>
                  {/* options to set like school name (from the set list of schools) with ability to search (just like the Input from teacher find page), saves to localstorage */}
                  <div className="text-center">
                    <p>{"ברוכים הבאים להגדרות!"}</p>

                    <p className="mt-8">{"כרגע אין אפשרות לבחור בית ספר,"}</p>
                    <p>{"האפליקציה זמינה רק לתיכון הרצוג."}</p>

                    <p className="mt-8">
                      {
                        "בעתיד הקרוב יהיה אפשר לבחור ממגוון רחב של בתי ספר בכל רחבי המדינה."
                      }
                    </p>
                  </div>
                </React.Fragment>
              ) : page === "report-teacher" ? (
                <React.Fragment>
                  <div className="text-center">
                    <div className="flex justify-center items-center flex-col gap-4">
                      <p>{"בחר מורה ואת החדר שבו נרא/תה:"}</p>
                      <div className="flex justify-center items-center flex-col gap-2">
                        <div className="flex justify-center items-center flex-row gap-2">
                          <div className="relative" ref={inputAreaRef}>
                            <Input
                              type="text"
                              placeholder="איתי קולדרצוב"
                              value={teacherName}
                              onChange={handleTeacherNameChange}
                              onFocus={() => setShowSuggestions(true)}
                              disabled={isLoading}
                            />

                            {showTeacherNameSuggestions && teacherName && (
                              <div className="absolute w-full z-50 mt-1">
                                <Command className="rounded-lg border shadow-md">
                                  <CommandList className="overflow-hidden">
                                    <CommandGroup>
                                      {filteredNames.length === 0 ? (
                                        <CommandEmpty>
                                          לא נמצא מורה עם השם שנכתב.
                                        </CommandEmpty>
                                      ) : (
                                        filteredNames.map((name) => (
                                          <CommandItem
                                            key={name}
                                            value={name}
                                            onSelect={() =>
                                              handleTeacherSelectName(name)
                                            }
                                            className="cursor-pointer"
                                          >
                                            {name}
                                          </CommandItem>
                                        ))
                                      )}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            )}
                          </div>
                          <Input
                            type="number"
                            placeholder="123"
                            className="w-20"
                            value={roomNumber}
                            onChange={handleRoomNumberChange}
                            disabled={isLoading}
                          />
                        </div>
                        <Button
                          onClick={reportTeacher}
                          disabled={isLoading || !isValidName || !isValidRoom}
                          className="w-full hover:bg-inherit"
                          variant="outline"
                        >
                          דווח
                        </Button>
                      </div>
                    </div>
                  </div>
                  {teacherReportResponseMessage != "" && (
                    <Alert className="text-right animate-expand-vertical">
                      {teacherReportResponseMessage}
                    </Alert>
                  )}
                </React.Fragment>
              ) : page === "calculator" ? (
                <React.Fragment>זה המחשבון.</React.Fragment>
              ) : null}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="flex justify-center items-center h-screen">
            <LoaderCircle className="animate-spin w-16 h-16" />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
