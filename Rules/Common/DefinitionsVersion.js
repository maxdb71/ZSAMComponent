export default function DefinitionsVersion(context) {
    let versionInfo = context.getVersionInfo()["Definitions Version"];
    return "Definitions Version: " + versionInfo;
}
