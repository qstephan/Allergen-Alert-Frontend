import renderer from 'react-test-renderer';
import React from 'react';
import Login from '../src/screens/auth/Login';
import { AuthContext } from '../src/context';
import MockDate from 'mockdate'
import SelectRestriction, { AddOptions } from '../src/screens/AddOptions'
import Settings from '../src/screens/Settings';

const FRAME_TIME = 10

const advanceOneFrame = () => {
  const now = Date.now();
  MockDate.set(new Date(now + FRAME_TIME));
  jest.advanceTimersByTime(FRAME_TIME);
}

const timeTravel = (msToAdvance = FRAME_TIME) => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME;
  let framesElapsed = 0;

  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame();
    framesElapsed++;
  }
}
global.requestAnimationFrame = cb => {
  setTimeout(cb, FRAME_TIME);
}

export const setupTimeTravel = () => {
    MockDate.set(0);
    jest.useFakeTimers();
}

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: 'Icon'
}));

beforeEach(setupTimeTravel);

const authContext = {
    token: null,
    logIn(token) { },
    logOut() { },
}

describe("SettingsPageTests", () => {
    test("Renders correctly", async () => {
        const tree = renderer.create(
            <AuthContext.Provider value={authContext}>
                <Settings />
            </AuthContext.Provider>
        ).toJSON(); 

        timeTravel(500);

        expect(tree).toMatchSnapshot();
    })
})