import PackageDescription

let package = Package(
    name: "TorusSwiftDirectSDK",
    dependencies: [
        .package(name: "TorusSwiftDirectSDK", url: "https://github.com/torusresearch/torus-direct-swift-sdk", .upToNextMajor(from: "1.1.0"))
    ],
)
