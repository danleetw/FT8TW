"""Python client for the FT8TW plugin API."""

from .client import (
    ApiError,
    AuthError,
    CapabilityMissing,
    DEFAULT_PORT,
    Ft8twClient,
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
    "SessionChanged",
    "CapabilityMissing",
    "discover",
    "DEFAULT_PORT",
    "__version__",
]
