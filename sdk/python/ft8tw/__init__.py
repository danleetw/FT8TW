"""Python client for the FT8TW plugin API."""

from .client import (
    ApiError,
    AuthError,
    Busy,
    CapabilityMissing,
    Conflict,
    ControlDisabled,
    DEFAULT_PORT,
    Ft8twClient,
    ScopeRequired,
    SessionChanged,
    Spot,
    discover,
)

__version__ = "1.0.0"

__all__ = [
    "Ft8twClient",
    "Spot",
    "ApiError",
    "AuthError",
    "ScopeRequired",
    "ControlDisabled",
    "Conflict",
    "Busy",
    "SessionChanged",
    "CapabilityMissing",
    "discover",
    "DEFAULT_PORT",
    "__version__",
]
