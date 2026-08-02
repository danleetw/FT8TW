@echo off
REM ---------------------------------------------------------------------------
REM  FT8TW SDK example launcher (Windows)
REM
REM  Double-click it, or:  run.bat 3          to start example 3 directly
REM
REM  The phone address and token can come from the environment, so you only type
REM  them once per session:
REM      set FT8TW_HOST=192.168.1.20
REM      set FT8TW_TOKEN=your-token-here
REM
REM  This file deliberately does NOT save your token anywhere. A token in a file
REM  is a token that gets committed, backed up, or read over your shoulder -- and
REM  the full-access one can key your radio.
REM ---------------------------------------------------------------------------
setlocal enabledelayedexpansion
cd /d "%~dp0"

REM --- find Python -----------------------------------------------------------
set PY=
for %%C in (py python python3) do (
    if not defined PY (
        %%C --version >nul 2>&1 && set PY=%%C
    )
)
if not defined PY (
    echo.
    echo Python was not found on this computer.
    echo Install it from https://www.python.org/downloads/ and tick
    echo "Add python.exe to PATH" during setup.
    echo.
    pause
    exit /b 1
)

REM --- pick an example -------------------------------------------------------
set CHOICE=%1
if not "%CHOICE%"=="" goto :chosen

echo.
echo   FT8TW SDK examples
echo   ==================
echo.
echo    1  Live decode list
echo         Scrolls as decodes arrive, one line each: UTC, signal report,
echo         DT, DF and the message, with a rule between slots.
echo.
echo    2  Record decodes to a CSV file
echo         Same data, appended to decodes.csv instead of the screen.
echo         Remembers where it stopped, so you can close it and come back.
echo.
echo    3  Status dashboard
echo         One screen, redrawn every 3 seconds: your callsign and band,
echo         mode, TX or RX, whether the radio is connected, SWR and power,
echo         plus the 12 most recent decodes. Nothing scrolls away.
echo.
echo    4  Copy the QSO log to SQLite
echo         Mirrors the phone's contact log into a local database file so
echo         you can query it, back it up, or feed it to other software.
echo.
echo    5  Find the phone, then stream
echo         Locates FT8TW on your network by itself - no IP address needed
echo         - then shows decodes as they happen.
echo         The search needs one extra package:  pip install zeroconf
echo         Already know the address? Set FT8TW_HOST and it skips the search.
echo.
echo    6  Transmit watchdog                       (needs the FULL token)
echo         Watches while you transmit and stops it if the SWR goes high
echo         or the PTT sticks. It only ever stops; it never starts.
echo.
echo    7  Tour of the control endpoints           (needs the FULL token)
echo         Walks through every remote-control call and shows what each
echo         refusal means. Reports what it would do; add --arm to execute.
echo.
echo    8  Watch what the screen is showing
echo         Which screen the operator is on, the status line, and the
echo         notices the app popped up - the part you cannot see when you
echo         are not next to the phone. Redraws the whole screen every
echo         couple of seconds; add --follow to log only the changes.
echo         The settings screen needs the FULL token (it shows the keys).
echo.
set /p CHOICE=Which one? [1-8]
if "%CHOICE%"=="" exit /b 0

:chosen
set SCRIPT=
if "%CHOICE%"=="1" set SCRIPT=01_watch_decodes.py
if "%CHOICE%"=="2" set SCRIPT=02_log_to_csv.py
if "%CHOICE%"=="3" set SCRIPT=03_dashboard.py
if "%CHOICE%"=="4" set SCRIPT=04_qso_sync.py
if "%CHOICE%"=="5" set SCRIPT=05_find_and_stream.py
if "%CHOICE%"=="6" set SCRIPT=06_tx_watchdog.py
if "%CHOICE%"=="7" set SCRIPT=07_remote_control.py
if "%CHOICE%"=="8" set SCRIPT=08_watch_screen.py
if not defined SCRIPT (
    echo "%CHOICE%" is not one of 1-8.
    pause
    exit /b 1
)

REM --- address and token -----------------------------------------------------
REM Example 5 discovers the phone itself, so its address is optional.
set HOSTADDR=%FT8TW_HOST%
if "%CHOICE%"=="5" goto :token
if "%HOSTADDR%"=="" (
    echo.
    echo The phone shows its address in Config - Developer API.
    set /p HOSTADDR=Phone address [e.g. 192.168.1.20]:
)
if "%HOSTADDR%"=="" (
    echo No address given.
    pause
    exit /b 1
)

:token
set TOKEN=%FT8TW_TOKEN%
if "%TOKEN%"=="" (
    echo.
    if "%CHOICE%"=="6" echo This example needs the FULL token, not the read-only one.
    if "%CHOICE%"=="7" echo This example needs the FULL token, not the read-only one.
    if "%CHOICE%"=="8" echo A FULL token is needed to read the settings screen; read-only works elsewhere.
    echo Copy it from Config - Developer API on the phone.
    set /p TOKEN=Token:
)
if "%TOKEN%"=="" (
    echo No token given.
    pause
    exit /b 1
)

REM --- extra arguments some examples take ------------------------------------
set EXTRA=
if "%CHOICE%"=="2" set EXTRA=decodes.csv
if "%CHOICE%"=="4" set EXTRA=qso_mirror.db
REM 08 mirrors the whole screen by default; --follow logs only the changes,
REM --ids adds each view id.
if "%CHOICE%"=="8" if /i "%2"=="--follow" set EXTRA=--follow
if "%CHOICE%"=="8" if /i "%2"=="--ids" set EXTRA=--ids

REM Example 7 only reports what it would do unless you pass --arm. That stays a
REM manual step: nothing here should put a signal on the air because someone
REM pressed Enter on a menu.
if "%CHOICE%"=="7" (
    echo.
    echo Running as a dry run. Nothing will be transmitted or changed.
    echo To execute for real:  run.bat 7 --arm
    if /i "%2"=="--arm" set EXTRA=--arm
    if /i "%2"=="--arm" echo ARMED - this WILL key your radio.
)

REM --- go --------------------------------------------------------------------
REM -u keeps the output unbuffered; without it the streaming examples look hung.
echo.
if "%CHOICE%"=="5" (
    %PY% -u "%SCRIPT%" %TOKEN% %HOSTADDR%
) else (
    %PY% -u "%SCRIPT%" %HOSTADDR% %TOKEN% %EXTRA%
)

echo.
echo (example finished)
pause
