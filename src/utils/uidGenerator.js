// import UIDGenerator from 'uid-generator'
import { nanoid } from "nanoid";

// const uidgen = new UIDGenerator(96, UIDGenerator.BASE16)

const generateNewUid = () => nanoid(16);

export default generateNewUid