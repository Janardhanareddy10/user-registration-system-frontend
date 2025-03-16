"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.deleteUser = exports.updateUser = exports.createUser = exports.fetchUserById = exports.fetchUsers = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URL = "http://13.49.18.19/api/users"; // ✅ Fetch all users

var fetchUsers = (0, _toolkit.createAsyncThunk)("users/fetchUsers", function _callee() {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); // ✅ Get user by ID

exports.fetchUsers = fetchUsers;
var fetchUserById = (0, _toolkit.createAsyncThunk)("users/fetchUserById", function _callee2(id) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/").concat(id)));

        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // ✅ Create a new user

exports.fetchUserById = fetchUserById;
var createUser = (0, _toolkit.createAsyncThunk)("users/createUser", function _callee3(userData) {
  var response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL, userData));

        case 2:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // ✅ Update user

exports.createUser = createUser;
var updateUser = (0, _toolkit.createAsyncThunk)("users/updateUser", function _callee4(_ref) {
  var id, userData, response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = _ref.id, userData = _ref.userData;
          _context4.prev = 1;
          console.log("Sending update request:", {
            id: id,
            userData: userData
          });
          _context4.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(API_URL, "/").concat(id), userData));

        case 5:
          response = _context4.sent;
          console.log("Update response:", response.data);
          return _context4.abrupt("return", response.data);

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          console.error("Error updating user:", _context4.t0.response ? _context4.t0.response.data : _context4.t0.message);
          throw _context4.t0;

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // ✅ Delete user

exports.updateUser = updateUser;
var deleteUser = (0, _toolkit.createAsyncThunk)("users/deleteUser", function _callee5(id) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(API_URL, "/").concat(id)));

        case 2:
          return _context5.abrupt("return", id);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteUser = deleteUser;
var userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: {
    users: [],
    user: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchUsers.pending, function (state) {
      state.loading = true;
    }).addCase(fetchUsers.fulfilled, function (state, action) {
      state.loading = false;
      state.users = action.payload;
    }).addCase(fetchUsers.rejected, function (state, action) {
      state.loading = false;
      state.error = action.error.message;
    }).addCase(fetchUserById.fulfilled, function (state, action) {
      state.user = action.payload;
    }).addCase(createUser.fulfilled, function (state, action) {
      state.users.push(action.payload);
    }).addCase(updateUser.fulfilled, function (state, action) {
      var index = state.users.findIndex(function (user) {
        return user._id === action.payload._id;
      });
      if (index !== -1) state.users[index] = action.payload;
    }).addCase(deleteUser.fulfilled, function (state, action) {
      state.users = state.users.filter(function (user) {
        return user._id !== action.payload;
      });
    });
  }
});
var _default = userSlice.reducer;
exports["default"] = _default;
//# sourceMappingURL=userSlice.dev.js.map
